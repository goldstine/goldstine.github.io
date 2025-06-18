
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



#### 聊天记忆
(https://blog.csdn.net/qq_38701478/article/details/147636737)[聊天记录实现案例]


聊天记忆存储在本地内存中，如果重启机器会导致记忆丢失，如果分布式部署在不同的节点上，也会导致在不同节点上的记忆不一致，所以提供一个接口用于用户自定义 “记忆” 存储方式 SingleSlotChatMemoryStore      


<img width="1692" alt="image" src="https://github.com/user-attachments/assets/2dc7bc6a-7e1e-4501-b3d7-adab29b17670" />
<img width="1441" alt="image" src="https://github.com/user-attachments/assets/19d9d993-1c9f-437b-a986-b1e91fefed18" />

配置类配置缓存的最多消息条数

```
@AiService(wiringMode = AiServiceWiringMode.EXPLICIT,chatModel = "openAiChatModel",chatMemory = "chatMemory")
public interface Assitant {
    String chat(String userMessage);
}
```
```
@Bean
    public ChatMemory chatMemory(){
        return MessageWindowChatMemory.withMaxMessages(10);
    }
```
```
@GetMapping("/assistantChat")
    public Map<String,Object> assistantChat(@RequestParam("question") String question){
        Map<String,Object> resultMap = new HashMap<>();
        String chat = assitant.chat(question);
        System.out.println(chat);

        resultMap.put("answer",chat);
        return resultMap;
    }
```

#### 聊天记忆隔离

```
@AiService(wiringMode = AiServiceWiringMode.EXPLICIT,chatMemory = "chatMemory",chatModel="openAiChatModel",chatMemoryProvider = "chatMemoryProvider")
public interface SeparateChatAssistant {
    String chat(@MemoryId int memoryId, @UserMessage String userMessage);
}
```

```
@Bean
    public ChatMemoryProvider chatMemoryProvider(){
        return memoryId-> MessageWindowChatMemory.builder().id(memoryId).maxMessages(10).build();
    }
```

```
@GetMapping("/separateChat")
    public Map<String,Object> separateChat(@RequestParam("id")Integer id,@RequestParam("question")String question){
        Map<String,Object> resultMap = new HashMap<>();

        String chat = separateChatAssistant.chat(id, question);

        System.out.println(chat);

        resultMap.put("answer",chat);
        return resultMap;
    }

```

<img width="890" alt="image" src="https://github.com/user-attachments/assets/ac4006e2-5870-41d8-8034-f04f80d0059f" />





