namespace InstagramWorker
{
    public static class LoggerExtensions
    {
        public static void LogServiceException(this ILogger logger, string serviceName, Exception ex)
        {
            logger.LogError(ex, "{ServiceName}: Error occurred! --- {ExceptionType}", serviceName, ex.GetType().Name);
        }

        public static void LogServiceStart(this ILogger logger, string serviceName)
        {
            logger.LogInformation("System: Successfully started {serviceName}!", serviceName);
        }

        public static void LogRunningMessage(this ILogger logger, string serviceName)
        {
            logger.LogInformation("[{WorkerName}] running ... ", serviceName);
        }

        public static void LogServiceStop(this ILogger logger, string serviceName)
        {
            logger.LogInformation("System: Successfully stopped {serviceName}!", serviceName);
        }

        public static void LogNextRunMessage(this ILogger logger, string serviceName, DateTime dateTime)
        {
            logger.LogInformation("[{serviceName}] next run on {date} at {time} ... ", serviceName, dateTime.Date.ToString("yyyy-MM-dd"), dateTime.TimeOfDay);
        }

        public static void LogProcessing(this ILogger logger, string serviceName)
        {
            logger.LogInformation("[{serviceName}]: Processing services ...", serviceName);
        }

        public static void LogProcessingFinishMessage(this ILogger logger, string serviceName, int runtimeSeconds)
        {
            logger.LogInformation("[{serviceName}] finished! Processing time: {runtimeSeconds} {sec}", serviceName, runtimeSeconds, runtimeSeconds == 1 ? "second" : "seconds");
        }

        public static void LogServiceSuccessful(this ILogger logger, string serviceName)
        {
            logger.LogInformation("{serviceName} Successful!", serviceName);
        }
    }
}
