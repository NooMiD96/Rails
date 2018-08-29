using System;
using System.Linq;
using System.Security.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using CoreReactReduxTypeScript.Contexts.ProjectTodoIdentity;
using CoreReactReduxTypeScript.Contexts.ProjectTodo;
using CoreReactReduxTypeScript.Models.ProjectTodoIdentity;
using CoreReactReduxTypeScript.Models.Account;
using CoreReactReduxTypeScript.Controllers.Api.Services;

namespace CoreReactReduxTypeScript.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ProjectTodoContext _context;
        private readonly AccountService _service;

        public AccountController([FromServices] UserManager<ApplicationUser> userManager,
                                 [FromServices] SignInManager<ApplicationUser> signInManager,
                                 [FromServices] ProjectTodoContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _service = new AccountService();
        }

        [HttpPost("[action]")]
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
                    //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
                    //await _emailSender.SendEmailConfirmationAsync(model.Email, callbackUrl);

                    await _context.AddNewUserAsync(user.Id);
                    await _userManager.AddToRoleAsync(user, Roles.User);
                    await _signInManager.SignInAsync(user, isPersistent: true);

                    return Ok(_service.SuccessUserAuth(user.UserName, Roles.User));
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
                    //    return RedirectToAction(nameof(LoginWith2fa), new { returnUrl, model.RememberMe });
                    //if (result.IsLockedOut)
                    //    return RedirectToAction(nameof(Lockout));

                    var userRoleDefined = await _userManager.GetRoleAsync(user);

                    return Ok(_service.SuccessUserAuth(user.UserName, userRoleDefined));
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
            return Ok(_service.SuccessLogOut(userName));
        }
    }
}