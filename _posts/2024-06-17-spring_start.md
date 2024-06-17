#

## Spring 启动过程中的扩展点
+ BeanFactoryAware,可在bean中获取BeanFactory实例
+ ApplicationContextAware ,可在bean中获取ApplicationAware实例
+ BeanNameAware, 可在Bean中获取它在IOC容器中的Bean实例的名字
+ ApplicationListener. 可监听ContextRefershedEvent等
+ CommandLineRunner ,整个项目启动完成之后，自动执行
+ SmartLifecycle#start 在Spring bean实例化之后，执行start方法
+ 使用@PostConstruct 注解，用于Bean实例初始化
+ 实现InitializingBean. 接口，用于bean实例初始化
+ xml中声明init-method方法，用于Bean实例化
+ Configuration 配置类，通过@Bean注解，注册Bean到spring
+ BeanPostProcessor 在bean的初始化前后，植入扩展点
+ BeanFactoryPostProcessor 在BeanFactory创建后植入扩展点


## spring扩展点
+ 参考 https://cloud.tencent.com/developer/article/2175801
+ [1]ApplicationContextInitializer  这个是整个spring容器在刷新之前初始化ConfigurableApplicationContext的回调接口，容器刷新之前调用此类的initialize方法，这个点允许用户进行扩展，可以在整个spring还没有初始化之前做一些事情，因为这时候spring容器还没有被初始化，想要自己的扩展生效，需要一下三种方式
1、在启动类中。SpringApplication.addInitializers(new TestApplicationContextInitializer());
2、配置文件 配置。context.initializer.classes=扩展累路径
3、Spring spi扩展，在spring.factories中加入. org.springframework.context.ApplicationContextInitializer=类路径

+ [2]BeanDefinitionRegistryPostProcessor
这个接口在读取项目中的beanDefinition之后执行，提供一个补充的扩展点
可以动态注册自己的beanDefinition，可以加载classpath之外的bean

+ [3]BeanFactoryPostProcessor
这个接口是BeanFactory的扩展接口，调用时机在spring读取beanDefinition信息之后，实例话bean之前
这个时机，用户可以通过实现这个扩展接口来自行处理一些东西，比如修改已经注册的beanDefinition的元信息

+ [4]InstantiationAwareBeanPostProcessor
这个接口继承了BeanPostProcesso接口，区别如下：
BeanPostProcess接口只在bean的初始化阶段进行扩展（注入spring上下文前后），而InstantiationAwareBeanPostProcessor接口在此基础上增加了3个方法，把可扩展的范围增加了实例化阶段和属性注入阶段。

该类主要的扩展点有以下5个方法，主要在bean生命周期的两大阶段：实例化阶段和初始化阶段，下面一起进行说明，按调用顺序为：
该类主要的扩展点有以下5个方法，主要在bean生命周期的两大阶段：实例化阶段和初始化阶段，下面一起进行说明，按调用顺序为：

postProcessBeforeInstantiation：实例化bean之前，相当于new这个bean之前
postProcessAfterInstantiation：实例化bean之后，相当于new这个bean之后
postProcessPropertyValues：bean已经实例化完成，在属性注入时阶段触发，@Autowired,@Resource等注解原理基于此方法实现
postProcessBeforeInitialization：初始化bean之前，相当于把bean注入spring上下文之前
postProcessAfterInitialization：初始化bean之后，相当于把bean注入spring上下文之后
使用场景：这个扩展点非常有用 ，无论是写中间件和业务中，都能利用这个特性。比如对实现了某一类接口的bean在各个生命期间进行收集，或者对某个类型的bean进行统一的设值等等。


+ [5]SmartInstantiationAwareBeanPostProcessor
也是在bean实例化过程中

+ [6]BeanFactoryAware
在bean实例化之后，注入属性之前，也就是初始化之前setter之前，在这个时候，可以对每个bean作为特殊化定制，也或者可以把BeanFactory拿到进行缓存

+ [7]ApplicationContextAwareProcessor
在bean实例话之后初始化之前

+ [8]beanNameAware
可以看到，这个类也是Aware扩展的一种，触发点在bean的初始化之前，也就是postProcessBeforeInitialization之前，这个类的触发点方法只有一个：setBeanName

使用场景为：用户可以扩展这个点，在初始化bean之前拿到spring容器中注册的的beanName，来自行修改这个beanName的值。

+ [9]@PostConstruct
在bean的初始化阶段，如果有这个注解，回西安调用这个方法，这个触发点是在postProcessBeforeInitialization之后，InitializingBean.afterPropertiesSet之前
用户可以对某一个方法进行标注，来进行初始化某个属性

+ [10]InitializingBean
这个类，顾名思义，也是用来初始化bean的。InitializingBean接口为bean提供了初始化方法的方式，它只包括afterPropertiesSet方法，凡是继承该接口的类，在初始化bean的时候都会执行该方法。这个扩展点的触发时机在postProcessAfterInitialization之前。

使用场景：用户实现此接口，来进行系统启动的时候一些业务指标的初始化工作。

+ [11]FactoryBean
一般情况下，Spring通过反射机制利用bean的class属性指定支线类去实例化bean，在某些情况下，实例化Bean过程比较复杂，如果按照传统的方式，则需要在bean中提供大量的配置信息。配置方式的灵活性是受限的，这时采用编码的方式可能会得到一个简单的方案。Spring为此提供了一个org.springframework.bean.factory.FactoryBean的工厂类接口，用户可以通过实现该接口定制实例化Bean的逻辑。FactoryBean接口对于Spring框架来说占用重要的地位，Spring自身就提供了70多个FactoryBean的实现。它们隐藏了实例化一些复杂bean的细节，给上层应用带来了便利。从Spring3.0开始，FactoryBean开始支持泛型，即接口声明改为FactoryBean<T>的形式

使用场景：用户可以扩展这个类，来为要实例化的bean作一个代理，比如为该对象的所有的方法作一个拦截，在调用前后输出一行log，模仿ProxyFactoryBean的功能。


+ [12]SmartInitializingSingleton
这个接口中只有一个方法afterSingletonsInstantiated，其作用是是 在spring容器管理的所有单例对象（非懒加载对象）初始化完成之后调用的回调接口。其触发时机为postProcessAfterInitialization之后。

使用场景：用户可以扩展此接口在对所有单例对象初始化完毕后，做一些后置的业务处理。

+ [13]CommandLineRunner
这个接口也只有一个方法：run(String... args)，触发时机为整个项目启动完毕后，自动执行。如果有多个CommandLineRunner，可以利用@Order来进行排序。

使用场景：用户扩展此接口，进行启动项目之后一些业务的预处理。

+ [14]DisposableBean
这个扩展点也只有一个方法：destroy()，其触发时机为当此对象销毁时，会自动执行这个方法。比如说运行applicationContext.registerShutdownHook时，就会触发这个方法。

+ [15]ApplicationListener


# 参考
http://www.gydblog.com/spring/spi.html#%E4%B8%89%E3%80%81spring%E7%9A%84spi%E8%AE%BE%E8%AE%A1
