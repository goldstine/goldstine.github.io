

### elasticsearch DSL

#### 创建索引
创建索引并设置mapping:       
```

PUT /20250123index
{
  "mappings": {
    "properties": {
      "brandName": {
        "type": "keyword"
      },
      "categoryName": {
        "type": "keyword"
      },
      "createTime": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss"
      },
      "id": {
        "type": "keyword"
      },
      "price": {
        "type": "double"
      },
      "saleNum": {
        "type": "integer"
      },
      "status": {
        "type": "integer"
      },
      "stock": {
        "type": "integer"
      },
      "title": {
        "type": "text",
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart"
      }
    }
  },
  "settings": {
    "number_of_shards": 2,
    "number_of_replicas": 2
  }
}
```
<img width="1667" alt="image" src="https://github.com/user-attachments/assets/a5cf009e-2a09-421b-a927-e86836d151b8" />

#### 删除索引
删除索引： delete 索引名称      
<img width="1153" alt="image" src="https://github.com/user-attachments/assets/18374e37-6844-4787-8c57-8af8d68174dd" />

#### 重建索引
<img width="880" alt="image" src="https://github.com/user-attachments/assets/34cb0c28-4ee3-44ba-be34-a8930b6c8955" />


#### 创建文档：
PUT 索引名/_create/es的id号        
es的id 号通过下面方式不能重复创建。    
```
PUT 20250123index/_create/2
{
  "id": 1,          业务数据的id
  "brandName": "Apple",
  "categoryName": "手机",
  "createTime": "2023-10-22 19:12:56",
  "price": 8799,
  "saleNum": 599,
  "status": 0,
  "stock": 1000,
  "title": "Apple iPhone 15 Pro 512GB 远峰蓝色 支持移动联通电信5G 双卡双待手机"
}
```
<img width="898" alt="image" src="https://github.com/user-attachments/assets/e24051c0-92f5-4d4d-8ade-cb77bef35f8e" />

通过 PUT 索引名称/_doc/es ID号。     
通过下面方式创建文档会覆盖相同的es ID号
```
PUT goods/_doc/2
{
  "id": 2,
  "brandName": "Apple",
  "categoryName": "手机",
  "createTime": "2023-10-22 19:12:56",
  "price": 8799,
  "saleNum": 599,
  "status": 0,
  "stock": 1000,
  "title": "Apple iPhone 15 Pro 256GB 远峰蓝色 支持移动联通电信5G 双卡双待手机"
}
```

#### 更新文档 

``` 
POST goods/_update/1        索引名称/_update/es文档号
{
  "doc": {
    "title":"Apple iPhone 13 Pro (A2639) 256GB 远峰蓝色 支持移动联通电信5G 双卡双待手机111"
  }
}
```
<img width="911" alt="image" src="https://github.com/user-attachments/assets/b5359f55-a19b-467c-8109-5d00f7ca4875" />


#### 删除文档
DELETE 20250123index/_doc/2       
DELETE 索引名称/_doc/es id 号。      


#### 获取文档
获取单个文档  GET 20250123index/_doc/3     GET 索引名称/_doc/es id 号。    
<img width="1302" alt="image" src="https://github.com/user-attachments/assets/2760e454-94ac-4e23-9eb5-435cc526e619" />

批量获取多个文档。     
```
GET books/_doc/_mget      索引名称/_doc/_mget
{
  "ids": ["1","2"]    es id号数组
}
```
<img width="1441" alt="image" src="https://github.com/user-attachments/assets/2562bad8-508a-48b1-a64a-82a7c689b976" />


#### match查询
match查询会对查询内容做分词，然后根据倒排索引去匹配文档，Term查询对查询内容不做分词，直接去倒排索引里去匹配文档。    

匹配查询指定索引所有文档：      
```
GET /20240124index/_search
{
  "query": {
    "match_all": {}
  }
}
```

match_phrase短语查询      



匹配查询     



模糊匹配查询     











