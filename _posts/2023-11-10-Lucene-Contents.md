# Lucene核心技术

Lucene7.5.0  vs Lucene 8.7.0

## codecs
SIMD(Single Instruction Multiple Data)

## 索引文件
### DocValues
+ BinaryDocValues
+ SortedSetDocValues
+ SortedDocValues
+ SortedNumericDocValues
+ NumericDocValues
+ BinaryDocValues-8.7.0

### 索引文件之cfs&cfe
### 索引文件之segment_N
### 索引文件之fnm
### 索引文件之si
### 索引文件之fdx&fdt
### 索引文件之tvx&tvd
### 索引文件之liv
### 索引文件之dim&dii
### 索引文件之tim&tip
### 索引文件之doc
### 索引文件之pos&pay
### 索引文件之nvd&nvm
### 索引文件之fdx&fdt&fdm-8.6.0
### 索引文件之 kdd&kdi&kdm-8.6.0
### 索引文件之tvd&tvx&tvm-8.7.0

# Index
##  (1) 构造IndexWriter对象

## （2）执行段的合并

## （3）段的合并策略
+ LogMergePolicy
+ TieredMergerPolicy

## （4）段的合并调度MergeScheduler

##  (5) 索引文件的合并
+ 索引文件合并之 fdx&fdt&fdm

+ 索引文件合并之 fdx&fdt&

## (6) 文档的增删改

## （7）近实时搜索NRT

## (8) 文档提交之commit

## (9) 文档提交之flush

## (10) SegmentReader

## (11) 索引文件的生成

## (12) 软删除softDeletes

## (13) ReaderPool

## (14) 索引文件的载入

## （15） 内存索引

## （16） 强制合并 ForceMerge

## (17) 段内排序IndexSort

# Search

## 查询原理

## Collector

## 查询缓存LRU QueryCache

## FieldComparator

## 文档号合并（SHOLD）

## 文档号合并(MUST)

## BooleanQuery

## Store
+ 索引文件锁LockFactory

## Directory

## 索引文件的读取

## 范围域 rangeField

## block-max-WAND

## 查询topN的优化 之 NumericDocValues

## IndexOrDocValuesQuery

## DisjunctionMaxQuery

## GeoQuery

## PointRangeQuery

## IndexSortSortedNumericDocValuesRangeQuery

## 段的多线程查询

## BulkScorer

# Util

## RoaringDocIdSet

## Bkd-tree

## Automaton

## FixedBitSet

## ByteRefHash

## IntBlockPool

## RamUsageEstimator

## IndexedDISI

## 文档号搜集器DocIdSet

# 压缩存储

## LZ4 algorithm

## FST

## BulkOperationPacked

## 去重编码 dedupAndEncode

## PackedInts

## DirectWriter & DirectReader

## DirectMonotonicWriter & Reader

## Run Length游标编码

# Other

## 倒排表的数据结构
+ TermVector倒排表
+ 倒排表

##  SortedDocValues VS BinaryDocValues

## 两阶段遍历（TwoPhaseIterator）

## 查找表（lookup table）

## off-heap/on-heap

## TermRangeQuery

## TermsEnum
+ TermsEnum（一）
+ PostingsEnum（一）

## 删除队列DeleteQueue

## GeoHash编码

## DocIdSetIterator

## ImpactsDISI

## Scorer

## 
