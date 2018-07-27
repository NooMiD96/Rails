using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreReactReduxTypeScript.Models.Account
{
    public class RegistrationModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }

        /// <summary>
        /// Check Password of User
        /// </summary>
        /// <typeparam name="T">Usually it is ApplicationUser</typeparam>
        /// <param name="userManager">The manager which give Validation Rules</param>
        /// <param name="errors">If Password is not valid then return rules which not passed, else return null</param>
        /// <returns></returns>
        public bool IsValid<T>(UserManager<T> userManager, out IdentityError error) where T: class
        {
            IdentityError returnErrors = null;
            async ValueTask<bool> Validator(IPasswordValidator<T> x)
            {
                // Check second param
                var validResul = await x.ValidateAsync(userManager, null, "123");
                if (!validResul.Succeeded)
                {
                    returnErrors = validResul.Errors.FirstOrDefault();
                    return true;
                }
                else
                {
                    return false;
                }
            }

            var IsAnyRulesNotPassed = userManager.PasswordValidators
                .Any(x => Validator(x).GetAwaiter().GetResult());

            error = returnErrors;
            return !IsAnyRulesNotPassed;
        }
    }
}
