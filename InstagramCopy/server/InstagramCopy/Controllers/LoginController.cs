using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;

namespace InstagramCopy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController(ILogger<LoginController> logger) : ControllerBase
    {
        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] TokenRequest tokenRequest)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(tokenRequest.TokenId, new GoogleJsonWebSignature.ValidationSettings());

                // Here you would typically check if the user exists in your database, create a session, etc.
                return Ok(new { message = "Login successful", user = payload });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Invalid token", error = ex.Message });
            }
        }

        public class TokenRequest
        {
            public string TokenId { get; set; } = string.Empty;
        }
    }
}
