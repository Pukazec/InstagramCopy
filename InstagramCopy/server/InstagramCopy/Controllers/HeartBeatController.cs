using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InstagramCopy.Controllers
{
    public class HeartBeatController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> HeartBeat()
        {
            return Ok("Meow! Tu kaj sem!");
        }
    }
}
