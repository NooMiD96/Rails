using Newtonsoft.Json;

namespace CoreReactReduxTypeScript.Helpers
{
    static public class JsonHelper
    {
        static public readonly JsonSerializerSettings JsonSettings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            NullValueHandling = NullValueHandling.Ignore,
        };

        static public string Serialize(object obj) => JsonConvert
            .SerializeObject(obj, JsonSettings);

        static public T Deserialize<T>(string json) => JsonConvert
            .DeserializeObject<T>(json);
    }
}
