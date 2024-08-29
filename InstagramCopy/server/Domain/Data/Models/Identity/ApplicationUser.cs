using InstagramCopy.Data.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace InstagramCopy.Models.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public SubscriptionPlan SubscriptionPlan { get; set; }

        public SubscriptionPlan DesiredSubscriptionPlan { get; set; }

        public int TodayUploadCount { get; set; }
    }


    public static class ApplicationUserExtensions
    {
        public static async Task<string> GenerateTokenAsync(
            this ApplicationUser user,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration)
        {
            var userRoles = await userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
                {
                    new(ClaimTypes.NameIdentifier, user.Id),
                    new(ClaimTypes.Name, user.UserName),
                    new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = GetToken(authClaims, configuration);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static JwtSecurityToken GetToken(List<Claim> authClaims, IConfiguration configuration)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
