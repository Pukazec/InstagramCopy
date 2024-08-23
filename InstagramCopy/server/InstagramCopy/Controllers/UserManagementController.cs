using InstagramCopy.Services.UserServices.Identity.Commands;
using InstagramCopy.Services.UserServices.Identity.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Services.UserServices.Identity.Commands;
using System.Security.Claims;

namespace InstagramCopy.Controllers
{
    public class UserManagementController : BaseController
    {
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetUsers()
        {
            var result = await Mediator.Send(new GetUsersStatisticsQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "User, Administrator")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var result = await Mediator.Send(new GetUserStatisticQuery(id));
            return Ok(result);
        }

        [HttpPut("updatePlan")]
        [Authorize(Roles = "User, Administrator")]
        public async Task<IActionResult> UpdatePlan([FromBody] UpdatePlanCommand command)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);
            command.UserName = userName;

            var result = await Mediator.Send(command);
            return Ok(result);
        }


        [HttpPut("changePlan")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> ChangePlan([FromBody] ChangePlanCommand command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }
    }
}
