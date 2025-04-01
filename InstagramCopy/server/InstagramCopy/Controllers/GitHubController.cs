using InstagramCopy.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace InstagramCopy.Controllers
{
    public class GitHubController(
        SignInManager<ApplicationUser> signInManager,
        UserManager<ApplicationUser> userManager,
        IConfiguration configuration)
        : BaseController
    {
        [HttpGet("login")]
        public IActionResult GitHubLogin(string returnUrl = null)
        {
            var redirectUrl = Url.Action(nameof(GitHubResponse), nameof(GitHubController), new { ReturnUrl = returnUrl });
            var properties = signInManager.ConfigureExternalAuthenticationProperties("GitHub", redirectUrl);
            return Challenge(properties, "GitHub");
        }

        [HttpGet("/signin-github")]
        public async Task<IActionResult> GitHubResponse(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                return Redirect($"http://localhost:3000/login?error={Uri.EscapeDataString(remoteError)}");
            }

            var info = await signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return Redirect("http://localhost:3000/login?error=LoginFailed");
            }

            var result = await signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);
            if (result.Succeeded)
            {
                var user = await userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
                var token = user.GenerateTokenAsync(userManager, configuration);
                return Redirect($"http://localhost:3000/login?token={token}");
            }
            else
            {
                return Redirect("http://localhost:3000/login?error=LoginFailed");
            }
        }

        //[HttpGet("login-response")]
        //public async Task<IActionResult> GitHubResponse()
        //{
        //    var info = await signInManager.GetExternalLoginInfoAsync();
        //    if (info == null)
        //    {
        //        return RedirectToAction(nameof(IdentityController.Login));
        //    }

        //    var result = await signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);
        //    if (result.Succeeded)
        //    {
        //        return LocalRedirect(returnUrl);
        //    }
        //    else
        //    {
        //        var user = new ApplicationUser { UserName = info.Principal.FindFirstValue(ClaimTypes.Email), Email = info.Principal.FindFirstValue(ClaimTypes.Email) };
        //        var identityResult = await userManager.CreateAsync(user);
        //        if (identityResult.Succeeded)
        //        {
        //            identityResult = await _userManager.AddLoginAsync(user, info);
        //            if (identityResult.Succeeded)
        //            {
        //                await _signInManager.SignInAsync(user, isPersistent: false);
        //                return LocalRedirect(returnUrl);
        //            }
        //        }
        //        return View("Login");
        //    }
        //    var result = await HttpContext.AuthenticateAsync(IdentityConstants.ExternalScheme);
        //    if (!result.Succeeded)
        //        return BadRequest();

        //    var claims = result.Principal.Identities.FirstOrDefault().Claims.Select(claim => new
        //    {
        //        claim.Issuer,
        //        claim.OriginalIssuer,
        //        claim.Type,
        //        claim.Value
        //    });

        //    // You can issue a JWT token here as shown earlier
        //    return Ok(new { Claims = claims });
        //}
    }
}
