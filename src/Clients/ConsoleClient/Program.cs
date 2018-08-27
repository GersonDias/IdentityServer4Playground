using IdentityModel.Client;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;

namespace ConsoleClient
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var discovery = DiscoveryClient.GetAsync("http://localhost:5000").Result;

            if (discovery.IsError)
            {
                Console.WriteLine(discovery.Error);
                return;
            }

            // request a token to access the API
            // "client" and "secret" was configured in IdentityServer classes
            // or we could retrieve that from a database or generate that
            var tokenClient = new TokenClient(discovery.TokenEndpoint, "client", "secret");
            var tokenResponse = tokenClient.RequestClientCredentialsAsync("api1").Result;

            if (tokenResponse.IsError)
            {
                Console.WriteLine(tokenResponse.Error);
                return;
            }

            Console.WriteLine(tokenResponse.Json);

            // now we able to call the API
            var client = new HttpClient();
            client.SetBearerToken(tokenResponse.AccessToken);

            var response = client.GetAsync("http://localhost:5001/api/secure").Result;

            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine(response.StatusCode);
            }
            else
            {
                var content = response.Content.ReadAsStringAsync().Result;
                Console.WriteLine(JArray.Parse(content));
            }
        }
    }
}
