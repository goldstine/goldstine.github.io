
### 研究一下mac brew 脚本编写上传

2 安装方法
如果你还没有安装 Homebrew，请先安装 Homebrew

# 安装 Homebrew
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 配置环境变量
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# 验证是否已经安装成功
brew --version

安装 joy-log-analyzer 工具

# 添加 Homebrew 源
brew tap liushixuan.6/homebrew-scripts git@coding.jd.com:liushixuan.6/homebrew-scripts.git

# 安装脚本
brew install joy-log-analyzer
运行工具

# 直接运行
joy-log-analyzer
工具仓库地址：http://xingyun.jd.com/codingRoot/liushixuan.6/analyze-joy-log/
