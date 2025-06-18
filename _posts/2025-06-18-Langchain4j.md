
https://blog.csdn.net/qq_38701478/article/details/147636737

#### maven集成langchain4j
引入依赖：
```
<dependency>
            <groupId>dev.langchain4j</groupId>
            <artifactId>langchain4j-open-ai</artifactId>
            <version>1.0.0-beta3</version>
        </dependency>
        <dependency>
            <groupId>dev.langchain4j</groupId>
            <artifactId>langchain4j</artifactId>
            <version>1.0.0-beta3</version>
        </dependency>
```

使用：
```Java
public class LangChainTest {

    public static void main(String[] args) {
        String apiKey = "demo";

//        String apiKey = System.getenv("OPENAI_API_KEY");
        OpenAiChatModel model = OpenAiChatModel.builder().baseUrl("http://langchain4j.dev/demo/openai/v1").apiKey(apiKey).modelName("gpt-4o-mini").build();
        String answer = model.chat("Say 'Hello World'");
        System.out.println(answer); // Hello World

        String chat = model.chat("你是谁丫,详细的介绍一下你");
        System.out.println(chat);

        String chatMsg = model.chat("我现在很想知道 Langchain4j 是什么，能做什么，出现的背景以及它主要是为了解决什么问题");
        System.out.println(chatMsg);
    }
}

```

#### springboot集成langchain

<img width="815" alt="image" src="https://github.com/user-attachments/assets/8e139b89-5dd9-4bef-8cfc-462f01306e91" />

```
 <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.3</version>
    </parent>

<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>3.3.4</version>
        </dependency>

```

配置openAIChatModel自动注入配置：application.properties
```
server.port=8090

langchain4j.open-ai.chat-model.base-url=http://langchain4j.dev/demo/openai/v1
langchain4j.open-ai.chat-model.api-key=demo
langchain4j.open-ai.chat-model.model-name=gpt-4o-mini
langchain4j.open-ai.chat-model.log-requests=true
langchain4j.open-ai.chat-model.log-responses=true
```

编写controller：
```
@RestController
@RequestMapping("/langchain4j")
public class LangChainController {
    @Autowired
    private OpenAiChatModel openAiChatModel;

    @GetMapping("/chat")
    public Map<String,Object> chat(@RequestParam("question")String question){
        Map<String,Object> resultMap = new HashMap<>();
        String chat = openAiChatModel.chat(question);
        System.out.println(chat);

        resultMap.put("answer",chat);
        return resultMap;
    }
}
```


















