using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreReactReduxTypeScript.Models;
using CoreReactReduxTypeScript.Models.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegistrationModel userModel)
        {
            if (userModel.IsValid(_userManager, out var error))
            {
                var user = new ApplicationUser { UserName = userModel.UserName };
                var result = await _userManager.CreateAsync(user, userModel.Password);
                if (result.Succeeded)
                {
                    //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
                    //await _emailSender.SendEmailConfirmationAsync(model.Email, callbackUrl);
                    await _signInManager.SignInAsync(user, isPersistent: true);
                    return Ok();
                }
                else
                {
                    // TODO: can't create
                    // return error description
                }
            }
            else
            {
                // TODO: not valid
                // return error description
            }
            return BadRequest();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel userModel)
        {
            if (userModel.IsValid(out var error))
            {
                var result = await _signInManager.PasswordSignInAsync(
                    userModel.UserName,
                    userModel.Password,
                    isPersistent: true, 
                    lockoutOnFailure: false
                );
                
                if (result.Succeeded)
                {
                    return Ok();
                }
                //if (result.RequiresTwoFactor)
                //{
                //    return RedirectToAction(nameof(LoginWith2fa), new { returnUrl, model.RememberMe });
                //}
                //if (result.IsLockedOut)
                //{
                //    return RedirectToAction(nameof(Lockout));
                //}
                else
                {
                    // TODO: can't login
                    // return error description
                }
            }
            else
            {
                // TODO: not valid
                // return error description
            }
            return BadRequest();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}