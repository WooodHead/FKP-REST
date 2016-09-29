import fs from 'fs'
import path from 'path'

let _homes = {}
const DOCSROOT = path.join(__dirname, '../../../fdocs')


function readDirs(dir){
  return new Promise((resolve, reject)=>{
    fs.readdir((dir||DOCSROOT), (err, data)=>{
      resolve(data)
    })
  })
}

function statFile(file){
  return new Promise((resolve,reject)=>{
    fs.stat(file, (err, data)=>{
      if (err) throw err
      resolve(data)
    })
  })
}

async function findFdocsList(){
  let _docsList = []
  let rootList = await readDirs(DOCSROOT)
  return new Promise(async (resolve, reject)=>{
    for (let i=0; i<rootList.length; i++){
      let filename = rootList[i]
      let path = DOCSROOT + '/' + filename
      let _stat = await statFile(path)
      if (_stat.isDirectory()){
        let secondList = await readDirs(path)
        var doc = {
          name: filename,
          path: path
        }
        if (secondList && secondList.length){
          if (_.includes(secondList, '_home.json')) doc['config'] = path + '/_home.json'
          if (_.includes(secondList, '_home.md')) doc['home'] = path + '/_home.md'
          if (_.includes(secondList, '_home.jpg')) doc['img'] = path + '/_home.jpg'
          _docsList.push(doc)
        }
      }
    }
    resolve(_docsList)
  })
}

class DocsList extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  componentWillMount() {
    if (this.props.data){
      this.setState({
        data: this.props.data   // array [{title: '', url: ''}]
      })
    }
  }

  render(){
    let lis = this.state.data.map((item, i)=>{
      let _img = item.img ? <img src={item.img} /> : <img src={'/images/empty.png'} />
      return (
        <li>
          <a href={item.url}>
            <span className='img'>
              {_img}
            </span>
            <span>{item.title}</span>
          </a>
        </li>
      )
    })
    return (
      <ul>
        {lis}
      </ul>
    )
  }
}

let exportHtml = async () => {
  let datas = await findFdocsList()
  let _datas = []
  datas.map((item, i)=>{
    let tmp = {
      title: item.name,
      url: '/docs?'+item.name,
      key: item.name+i
  }
    _datas.push(tmp)
  })
  return ReactDomServer.renderToString(<DocsList data={_datas} />)
}

export default exportHtml
