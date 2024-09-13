using Prometheus;

namespace Services.Services.Metrics
{
    public static class InstagramCopyMetric
    {
        public static readonly Counter HeartBeatEndpointCounter =
            Prometheus.Metrics.CreateCounter("heartbeat_endpoint_call_count", "Counts the number of calls to the specific endpoint.");
    }
}
