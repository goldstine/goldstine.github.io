## smpl

### 深度相机 RGB-D
深度相机（RGB-D Camera）：可以直接获取被测对象的三维信息（深度图）的相机；
深度图（Depth Texture）：图像中每一个像素值表示场景中某点与摄像机的距离；
两种计算物体位置和深度信息的方法：结构光&ToF（1）结构光：用投影仪投射特定的光信息到物体表面由摄像头采集，根据物体造成的光信号的变化来计算深度，常用于解锁以及安全支付；（2）ToF（Time of Flight，飞行时间）：传感器发出经调制的近红外光遇物体后反射，通过计算光线发射和反射时间差或相位差来换算深度，常用于智能机后置摄影具体介绍；

深度图数据集：
TUM RGB-D数据集  提供多种环境下视频数据  标定参数  groundtruth  工具
[rgbd-dataset](https://vision.in.tum.de/data/datasets/rgbd-dataset/download)

深度图  ImageJ查看工具  尺度因子  物理距离=像素值/尺度因子   1.2m=6000/5000
ImageJ功能强大，输出多种图片格式  对比度设置   深度图一般是16位的

能够直接输出深度图的相机：实现方式
+ 通过软件的方式间接计算获得
+ 通过硬件方式直接测量输出

飞行时间 TOF   time  of fly

输出彩色图和深度图 RGB-D相机   所以RGB-D相机是一种特殊的深度相机

单目结构光相机  有一个红外发射器和一个红外接收器;
双目结构光相机  有一个红外发射器和两个红外接收器;

### 编码 ：

时分复用编码  适用于静态物体；
空分复用编码  适用于运动物体

### 典型代表
Kinect v1  :  infrared projector ;  RGB Camera ;  infrared camera
Orbbec
structure sensor 
iphone x

### 应用
3D人脸解锁  活体检测识别
3D人脸打光  背景虚化
手机： 3D美颜 美体
3D动画表情
3维重建   RGB-D Slam场景三维重建
三维测量  AR
更精准手势识别  *人体姿态估计*
机器人slam  RGB-D sensor(Microsoft kinect)  ;  Marker for ground truth  ; Mobile robot(Pioneer 3-AT)


[深度相机](https://blog.csdn.net/qq_41665685/article/details/103476266?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-103476266-blog-105232489.pc_relevant_aa2&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-103476266-blog-105232489.pc_relevant_aa2&utm_relevant_index=1)
[深度相机RGB-D,KinectFusion](https://blog.csdn.net/weixin_44292547/article/details/125692766)


## KinectFusion

[基于RGB-D相机的三维重建总览](https://blog.csdn.net/qq_29462849/article/details/124906067?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-124906067-blog-128258371.235^v36^pc_relevant_default_base3&spm=1001.2101.3001.4242.1&utm_relevant_index=1)

基于RGB-D 的三维重建与 SFM和SLAM的三维重建之间的不同？参考上链接.

“基于RGB-D相机的三维重建”以及“基于深度相机的三维重建“和“基于fusion系列方法的三维重建”其实是三种等价的说法。由于该领域发表的大多数工作都在标题里带有“fusion”，业内也简称这些相关工作为“基于fusion系列方法”

基于fusion系列的三维重建其实可以大体分为两种，一种是对于静态场景的三维重建，以KinectFusion为典型代表，一种是对于动态场景的三维重建，以DynamicFusion为典型代表。而不论是静态场景亦或是动态场景的fusion系列重建，最大特点就是使用了**TSDF模型（截断符号距离函数模型）**，当然也有个别工作使用了**面元（Surfel）的表示方法（面元简单来讲就是点，法线，颜色，权重，半径以及时间戳等属性的集合）**。值得一提的是，基于动态场景的三维重建的难度远大于基于静态场景的三维重建，当然，对于拓扑不会发生变化的重建（比如驱动一个三维网格模板模型），难度会下降很多。

TSDF全称是Truncated Signed Distance Function缩写,译为截断符号距离函数
通常我们先选定要建模的三维空间，比如2m×2m×2m那么大，然后将这个三维空间分割成许多小块，分辨率通常为256×256×256或是128×128×128，每一个小块被称为体素。


KinectFusion,其核心思想将Kinect传感器采集的深度数据流实时融入到（fusion into）一个当前场景对应的全局的隐式表面模型（TSDF模型）中，并使用一个由粗到精的迭代最近点（ICP）算法，跟踪当前采集的深度帧数据与上文的全局的隐式表面模型之间的相对关系，从而获得Kinect传感器的位姿变化。

KinectFusion流程：

a) Depth Map Conversion (Measurement)：从深度图转为三维顶点及其法向量；

b) Camera Tracking (Pose Estimation)：运用ICP算法求解相机位姿；

c) Volumetric Integration (Update Reconstruction)：运用体积表面建模的方法估算物体表面；

d) Raycasting (Surface Prediction)：光线投影方法，计算物体表面点坐标和法线，用于渲染和下一帧的Camera Tracking步骤中相机位姿求解。

[Kinectfusion: Real-time dense surface mapping and tracking](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ismar2011.pdf)
[KinectFusion: Real-time 3D Reconstruction and Interaction](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/kinectfusion-uist-comp.pdf)
[A Volumetric Method for Building Complex Models fromRange Images](https://dl.acm.org/doi/pdf/10.1145/237170.237269)
[KinectFusion论文阅读](https://zhuanlan.zhihu.com/p/35894630)
[Kinect Fusion 算法浅析：精巧中带坑](https://zhuanlan.zhihu.com/p/24873528)
[啥是KinectFusion](https://zhuanlan.zhihu.com/p/39021659)

### 深度图转变  Depth Map  conversion
![深度图，点云坐标，顶点法向量；相机坐标转换为全局坐标](https://cdn.jsdelivr.net/gh/goldstine/MyImages/depth.png)
关节点和方向    顶点和法向量 法向量只表示方向，所以单位化 不需要长度，也不需要平移

**rgbd-kinect-poseRNN 根据Azure Kinect Body Tracking API检测到的关节估计身体姿势**
[Azure Kinect body tracking joints](https://learn.microsoft.com/en-us/azure/kinect-dk/body-joints)

Azure Kinect Body Tracking API:

### 人体骨骼关键点检测
[关键点检测](https://zhuanlan.zhihu.com/p/69042249)



### 静态与动态Fusion 基于RGB-D相机的三维重建
---
1 基于静态场景的三维重建

1.1 KinectFusion

1.2 Kintinuous

1.3 ElasticFusion

1.4 ElasticReconstruction

1.5 InfiniTAM

1.6 BundleFusion

2 基于动态场景的三维重建

2.1 DynamicFusion

2.2 volumeDeform

2.3 BodyFusion

2.4 DoubleFusion

2.5 UnstructuredFusion‍

2.6 RobustFusion

2.7 KillingFusion

2.8 SurfelWarp

2.9 Fusion4D
---