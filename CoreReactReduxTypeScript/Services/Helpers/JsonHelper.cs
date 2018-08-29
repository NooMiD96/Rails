using Newtonsoft.Json;

namespace CoreReactReduxTypeScript.Helpers
{
    public static class JsonHelper
    {
        public static readonly JsonSerializerSettings JsonSettings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            NullValueHandling = NullValueHandling.Ignore,
        };

        public static string Serialize(object obj) => JsonConvert
            .SerializeObject(obj, JsonSettings);

        public static T Deserialize<T>(string json) => JsonConvert
            .DeserializeObject<T>(json);
    }
}
