using InstagramCopy.Services.UserServices.Identity.Commands;
using InstagramCopy.Services.UserServices.Identity.Queries;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace InstagramCopy.Controllers
{
    public class UserManagementController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> UpdatePlan()
        {
            var result = await Mediator.Send(new GetUsersStatisticsQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> UpdatePlan(Guid id)
        {
            var result = await Mediator.Send(new GetUserStatisticQuery(id));
            return Ok(result);
        }

        [HttpPut("updatePlan")]
        public async Task<IActionResult> UpdatePlan([FromBody] UpdatePlanCommand command)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);
            command.UserName = userName;

            var result = await Mediator.Send(command);
            return Ok(result);
        }
    }
}
