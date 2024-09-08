应用启动耗时分析：
```
<dependency>
        <groupId>com.jd.jr.baitiao.marketing</groupId>
        <artifactId>timeAnalysis-spring-boot-starter</artifactId>
        <version>1.0.4-SNAPSHOT</version>
    </dependency>
```

配置耗时统计日志输出路径

```
	<appender name="Time_Analys"
		class="ch.qos.logback.core.rolling.RollingFileAppender">
		<file>/export/home/tomcat/logs/marketing.engine.jd.local/timeAnalys.log</file>
		<append>true</append>
		<filter class="ch.qos.logback.classic.filter.LevelFilter">
			<level>INFO</level>
			<onMatch>ACCEPT</onMatch>
			<onMismatch>DENY</onMismatch>
		</filter>
		<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
			<fileNamePattern>/export/home/tomcat/logs/marketing.engine.jd.local/timeAnalys.%d{yyyy-MM-dd}.%i.log
			</fileNamePattern>
			<timeBasedFileNamingAndTriggeringPolicy
				class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
				<maxFileSize>100MB</maxFileSize>
			</timeBasedFileNamingAndTriggeringPolicy>
			<maxHistory>100</maxHistory>
		</rollingPolicy>

		<encoder charset="UTF-8">
		  	<immediateFlush>false</immediateFlush>
			<pattern>%d{yy-MM-dd.HH:mm:ss.SSS} [%-16t] %-5p %-22c{0}%X{ServiceId} -%X{trace-id} %m%n</pattern>
		</encoder>
	</appender>
	<logger name="com.jd.jr.baitiao.marketing.time.analysis.autoconfigure.utils.TimeAnalysisBeanPostProcessor" level="INFO" additivity="false">
		<appender-ref ref="Time_Analys" />
	</logger>
```

配置文件配置：
```
#单位毫秒
start.analysis.consumeTimePrint=0
```