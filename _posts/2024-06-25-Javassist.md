#
参考：
[javassist解析](https://cloud.tencent.com/developer/article/1815164)

## 使用Javassist创建指定类，并添加方法hello
```
public class JavassistTest {


    public static void main(String[] args) throws CannotCompileException, IOException {
//        ClassPool cp = ClassPool.getDefault();
//        CtClass ctClass = cp.makeClass("org.example.javassist.Hello");
//        ctClass.writeFile("./");

        URL resource = JavassistTest.class.getClassLoader().getResource("");
        String file = resource.getFile();
        System.out.println("文件存储路径:"+file);

        ClassPool cp = ClassPool.getDefault();
        CtClass ctClass = cp.makeClass("com.ssdmbbl.javassist.Hello");
        CtMethod ctMethod = new CtMethod(CtClass.voidType, "hello", new CtClass[] {
            CtClass.intType,CtClass.doubleType
        }, ctClass);

        ctMethod.setModifiers(Modifier.PUBLIC);

        ctClass.addMethod(ctMethod);

// 新增一个变量
        CtField ctField = new CtField(CtClass.intType, "value", ctClass);
        ctField.setModifiers(Modifier.PRIVATE);
        ctClass.addField(ctField);

         //为value变量添加set方法
        CtMethod setValue = new CtMethod(CtClass.voidType, "setValue", new CtClass[]{CtClass.intType}, ctClass);
        setValue.setModifiers(Modifier.PUBLIC);


        //设置方法体
//        setValue.setBody("this.value = var1;");
//        setValue.setBody("this.value = $1;");
        ctMethod.setBody("this.value = $1 + $2;");

        ctClass.addMethod(setValue);

        //为value变量添加get方法
        CtMethod getValue = new CtMethod(CtClass.intType, "getValue", new CtClass[]{}, ctClass);
        getValue.setModifiers(Modifier.PUBLIC);

     //设置方法体
        getValue.setBody("return this.value;");

        ctClass.addMethod(getValue);


              //添加一个hello1的方法
        CtMethod ctMethod1 = new CtMethod(CtClass.voidType, "hello1", new CtClass[]{CtClass.intType, CtClass.doubleType}, ctClass);
        ctMethod1.setModifiers(Modifier.PUBLIC);
        ctMethod1.setBody("this.value = $1 + $2;");
        ctMethod1.insertBefore("System.out.println(\"我在前面插入了：\"+$1);");
        ctMethod1.insertAfter("System.out.println(\"我在最后插入了：\"+$1);");
        ctClass.addMethod(ctMethod1);

        ctClass.writeFile(file);
    }
}
```
### 添加方法可以设置的返回值类型：
```
public static CtClass booleanType;
public static CtClass charType;
public static CtClass byteType;
public static CtClass shortType;
public static CtClass intType;
public static CtClass longType;
public static CtClass floatType;
public static CtClass doubleType;
public static CtClass voidType;

```

### 新增一个字段，如上所示：
```
// 新增一个变量
        CtField ctField = new CtField(CtClass.intType, "value", ctClass);
        ctField.setModifiers(Modifier.PRIVATE);
        ctClass.addField(ctField);
```

### 新增get set方法，如上所示：
```
 //为value变量添加set方法
        CtMethod setValue = new CtMethod(CtClass.voidType, "setValue", new CtClass[]{CtClass.intType}, ctClass);
        setValue.setModifiers(Modifier.PUBLIC);
        ctClass.addMethod(setValue);

        //为value变量添加get方法
        CtMethod getValue = new CtMethod(CtClass.intType, "getValue", new CtClass[]{}, ctClass);
        getValue.setModifiers(Modifier.PUBLIC);
        ctClass.addMethod(getValue);
```

### 给方法设置方法体，如上所示：

```
        //设置方法体
//        setValue.setBody("this.value = var1;");
//        setValue.setBody("this.value = $1;");
        ctMethod.setBody("this.value = $1 + $2;");

     //设置方法体
        getValue.setBody("return this.value;");
```

### 在方法体前后分别插入代码
```
      //添加一个hello1的方法
        CtMethod ctMethod1 = new CtMethod(CtClass.voidType, "hello1", new CtClass[]{CtClass.intType, CtClass.doubleType}, ctClass);
        ctMethod1.setModifiers(Modifier.PUBLIC);
        ctMethod1.setBody("this.value = $1 + $2;");
        ctMethod1.insertBefore("System.out.println(\"我在前面插入了：\"+$1);");
        ctMethod1.insertAfter("System.out.println(\"我在最后插入了：\"+$1);");
        ctClass.addMethod(ctMethod1);
```

## javasasst一些常见参数 (todo)
$0. $1 $2
$args

$



