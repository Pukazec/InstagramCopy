using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Services.Metrics;

namespace InstagramCopy.Controllers
{
    public class HeartBeatController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> HeartBeat()
        {
            InstagramCopyMetric.HeartBeatEndpointCounter.Inc();
            return Ok("Meow! Tu kaj sem!");
        }
    }
}
