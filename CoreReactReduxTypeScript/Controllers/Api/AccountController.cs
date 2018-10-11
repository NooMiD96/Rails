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
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Antiforgery;
using static CoreReactReduxTypeScript.Services.Helpers.Xsrf;

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
        private readonly IAntiforgery _antiforgery;
        private readonly ILogger _logger;

        public AccountController([FromServices] UserManager<ApplicationUser> userManager,
                                 [FromServices] SignInManager<ApplicationUser> signInManager,
                                 [FromServices] ProjectTodoContext context,
                                 IAntiforgery antiforgery,
                                 ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _service = new AccountService();
            _antiforgery = antiforgery;
            _logger = logger;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Registration([FromBody] RegistrationModel userModel)
        {
            var user = new ApplicationUser {
                UserName = userModel.UserName,
                Email = userModel.Email
            };
            _logger.LogDebug($"Registration: UserName:{user.UserName}, Email:{user.Email}");
            if (userModel.IsValid(_userManager, user, out var error))
            {
                _logger.LogDebug($"Registration: Model is valid");

                var result = await _userManager.CreateAsync(user, userModel.Password);
                if (result.Succeeded)
                {
                    _logger.LogDebug($"Registration: Create user is Succeeded");

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
                    _logger.LogDebug($"Registration: Create user is Failure");

                    // TODO: can't create
                    // return error description
                    return BadRequest(result.Errors.FirstOrDefault()?.Description ?? "Please try again");
                }
            }
            _logger.LogDebug($"Registration: Model is invalid");

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
        public IActionResult ReNewXSRF([FromBody] RegistrationModel model)
        {
            if (_signInManager.IsSignedIn(User))
            {
                return Ok(XsrfToXpt(_antiforgery.GetAndStoreTokens(HttpContext)));
            }
            return BadRequest("User is not Signed");
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Logout()
        {
            var userName = User.Identity.Name;
            await _signInManager.SignOutAsync();
            return Ok(_service.SuccessLogOut(userName));
        }
    }
}