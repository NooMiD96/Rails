using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace CoreReactReduxTypeScript.Services
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
