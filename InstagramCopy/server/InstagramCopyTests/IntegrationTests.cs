using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace InstagramCopyTests
{
    public class IntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;
        private readonly WebApplicationFactory<Program> _factory;

        public IntegrationTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _client = _factory.CreateClient();
        }

        [Fact]
        public async Task Get_Endpoint_ReturnsOk()
        {
            // Arrange
            var url = "/HeartBeat";

            // Act
            var response = await _client.GetAsync(url);

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal("text/plain; charset=utf-8",
                response.Content.Headers.ContentType.ToString());

            var content = await response.Content.ReadAsStringAsync();
            Assert.NotEmpty(content);
        }
    }
}