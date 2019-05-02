# React-FaunaDB
FaunaDB CRUD with React.js

**note:** don't forget to _CHANGE_ `adminKey` in `App.js` :)
### GIST

```java
let client = new faunadb.Client({
    secret: adminKey
});
```

```java
let CreateDb = () => {
    client
        .query(q.CreateDatabase({name: "annuvin"}))
        .then((ret) => console.log(ret))
};
```

```java
let GetDb = () => {
    client.query(q.Get(q.Database("annuvin")))
        .then((ret) => console.log(ret))
};
```

```java
let Schema = () => {
    client.query(q.CreateClass({name: "posts"}))
        .then((ret) => console.log(ret))
};
```

```java
let CreateClass = () => {
    client.query(q.CreateClass({name: "spells"}))
        .then((ret) => console.log(ret));

    client.query(q.Paginate(q.Classes(null)))
        .then((ret) => console.log(ret));
};
```

```java
let GetClass = () => {
    client.query(q.Get(q.Class("spells")))
        .then((ret) => console.log(ret));
};
```

```java
let DeleteClass = () => {
    client.query(q.Delete(q.Class("spells")))
        .then((ret) => console.log(ret));
};
```

```java
let CreateInstance = () => {
    client.query(
        q.Create(
            q.Class("spells"), {data: {name: "Fire Beak", element: ["air", "fire"]}}))
        .then((ret) => console.log(ret))
};
```

```java
let UpdateInstance = ()=>{
    client.query(
        q.Replace(
            q.Ref(q.Class("spells"), "231168380520890884"),
            { data: {"name": "Water Beak",    "element": [    "Water",    "Air"]} }))
        .then((ret) => console.log(ret))
};
```

```java
let DeleteInstance = ()=>{
    client.query(q.Delete(q.Ref(q.Class("spells"),"231170600606892556")))
        .then((ret) => console.log(ret));

    client.query(q.Get(q.Ref(q.Class("spells"), "231170600606892556")))
        .then((ret) => console.log(ret))
        .catch((ret) => console.log(ret))
};
```

```java
let CreateIndex = () => {
    client.query(
        q.CreateIndex(
            { name: "all_spell_names",
                source: q.Class("spells"),
                values: [{ field: ["data", "name"] }] }))
        .then((ret) => console.log(ret));

    client.query(q.Paginate(q.Indexes(null)))
        .then((ret) => console.log(ret));
};
```

```java
let GetIndex = () => {
    client.query(q.Paginate(q.Match(q.Index("getAll"))))
        .then((ret) => console.log(ret))
};
```

```java
let UpdateIndex = () => {
client.query(
    q.Update(
        q.Index("getAll"),
        { name: "air" }))
    .then((ret) => console.log(ret));
};
```

```java
let DeleteIndex = () => {
client.query(q.Delete(q.Index("all_spells_all")))
    .then((ret) => console.log(ret))
};
```