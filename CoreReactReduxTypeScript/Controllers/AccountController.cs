using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreReactReduxTypeScript.Models;
using CoreReactReduxTypeScript.Models.Account;
using static CoreReactReduxTypeScript.Services.AccountService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using CoreReactReduxTypeScript.UserManagerExtensions;

namespace CoreReactReduxTypeScript.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(
            [FromServices] UserManager<ApplicationUser> userManager,
            [FromServices] SignInManager<ApplicationUser> signInManager
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("[action]")]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Registration([FromBody] RegistrationModel userModel)
        {
            var user = new ApplicationUser {
                UserName = userModel.UserName,
                Email = userModel.Email
            };
            if (userModel.IsValid(_userManager, user, out var error))
            {
                var result = await _userManager.CreateAsync(user, userModel.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "User");
                    //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
                    //await _emailSender.SendEmailConfirmationAsync(model.Email, callbackUrl);
                    await _signInManager.SignInAsync(user, isPersistent: true);
                    return Ok(SuccessAuthOrReg(user.UserName, "User"));
                }
                else
                {
                    // TODO: can't create
                    // return error description
                    return BadRequest(result.Errors.FirstOrDefault()?.Description ?? "Please try again");
                }
            }
            // TODO: not valid
            // return error description
            return BadRequest(error.Description ?? "Please try again");
        }

        [HttpPost("[action]")]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Authentication([FromBody] LoginModel userModel)
        {
            if (userModel.IsValid(out var error))
            {
                var user = await _userManager.FindByNameAsync(userModel.UserName);
                if (user is null) return BadRequest("User Name or Password incorrect");

                var isPasswordCanPass = await _signInManager.CheckPasswordSignInAsync(user, userModel.Password, false);
                if (!isPasswordCanPass.Succeeded) return BadRequest("User Name or Password incorrect");

                var result = isPasswordCanPass.Succeeded
                    ? await _signInManager.PasswordSignInAsync(
                        userModel.UserName,
                        userModel.Password,
                        isPersistent: true,
                        lockoutOnFailure: false
                    )
                    : new Microsoft.AspNetCore.Identity.SignInResult();

                if (result.Succeeded)
                {
                    //if (result.RequiresTwoFactor)
                    //{
                    //    return RedirectToAction(nameof(LoginWith2fa), new { returnUrl, model.RememberMe });
                    //}
                    //if (result.IsLockedOut)
                    //{
                    //    return RedirectToAction(nameof(Lockout));
                    //}
                    return Ok(SuccessAuthOrReg(user.UserName, await _userManager.GetRoleAsync(user)));
                }
                else
                {
                    // TODO: can't login
                    // return error description
                    return BadRequest("Please try again");
                }
            }
            else
            {
                // TODO: not valid
                // return error description
                return BadRequest(error.Description ?? "Please try again");
            }
        }

        [HttpPost("[action]")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            var userName = User.Identity.Name;
            await _signInManager.SignOutAsync();
            return Ok(SuccessLogOut(userName));
        }
    }
}