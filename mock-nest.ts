// ts-node 执行该文件

import 'reflect-metadata'

import axios from 'axios'

import http from 'http'

let responseData = {}

axios
  .get('https://api.oioweb.cn/api/common/HotList')
  .then(axiosResponse => {
    responseData = {
      msg: `response is OK`,
      response: axiosResponse.data,
    }
  })
  .catch(error => {
    responseData = {
      msg: `response is failed`,
      response: null,
    }
  })

const port = 9527

const SERVER_CONTROLLER_ROUTE = 'SERVER_CONTROLLER_ROUTE'

const SERVER_CONTROLLER_SUB_ROUTE = 'SERVER_CONTROLLER_SUB_ROUTE'

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.end(req.url)
  } else {
    const controllers = Reflect.getMetadata(SERVER_CONTROLLER_ROUTE, server) as any[]

    console.log(controllers, '\n controllers === 当前controller路由')

    const current_route = controllers.find(item => req.url?.startsWith(item.controller))

    if (current_route) {
      // 当前controller路由下的子路由
      const current_sub_route: any[] = Reflect.getMetadata(SERVER_CONTROLLER_SUB_ROUTE, current_route['class']) || []

      console.log(current_sub_route, '\n current_sub_route === 当前controller路由下的子路由')

      const path = req.url!.replace(current_route.controller, '')

      const match_sub_route = current_sub_route.filter((item: any) => item.subPath === path)

      // 路由匹配上了
      if (match_sub_route.length > 0) {
        console.log(`\n ${req.url} is exist`)

        // 匹配方法
        const match = match_sub_route.find(item => item.httpMethod === req.method?.toLocaleLowerCase())

        if (match) {
          console.log(match, '\n match => req.url & method === controller + controller_sub + method')

          const paramsKey: string[] = Reflect.getMetadata('paramsKey', current_route['class']) || []

          const map = {
            requset: req,
            response: res,
          }

          console.log(paramsKey, 'paramsKey')

          // 被方法参数装饰的list不为空，则取对应映射值
          if (!!paramsKey.length) {
            const callbackParams: any[] = []

            paramsKey.forEach(key => {
              const paramsKeyMeta: {
                paramsKey: string | null
                keyIndex: number
              } = {
                paramsKey: null,
                keyIndex: 0,
              }

              const meta = key.split('/')

              paramsKeyMeta['paramsKey'] = meta[0]

              paramsKeyMeta['keyIndex'] = Number(meta[1])

              callbackParams[paramsKeyMeta['keyIndex']] = map[paramsKeyMeta['paramsKey'] as keyof typeof map] || 'map is failed'
            })

            match.callback(...callbackParams)

            res.end()

            return
          }

          // 方法装饰器为空，正常返回
          match.callback(responseData)

          res.end()
        } else {
          res.end(`${req.url} is exist but http-method is error`)
        }
      } else {
        console.log(`\n ${req.url} is not exist`)

        res.end('404')
      }
    } else {
      res.end('404')
    }
  }
})

// 定义所有的controller集合
Reflect.defineMetadata(SERVER_CONTROLLER_ROUTE, [], server)

server.listen(port, () => {
  console.log(`server is running in localhost:${port}`)
})

const Controller = (path: string) => {
  const func: ClassDecorator = function (target) {
    console.log(target, 'Controller')

    // 取出当前的controller的路由
    const SERVER_CONTROLLER_ROUTE_LIST = Reflect.getMetadata(SERVER_CONTROLLER_ROUTE, server) || ([] as any[])

    SERVER_CONTROLLER_ROUTE_LIST.push({
      controller: path,
      class: target,
    })

    Reflect.defineMetadata(SERVER_CONTROLLER_ROUTE, SERVER_CONTROLLER_ROUTE_LIST, server)
  }

  return func
}

const Get = (path = '') => {
  const func: MethodDecorator = function (target, propertypeKey, description) {
    console.log(target.constructor, 'Get')

    const SERVER_CONTROLLER_SUB_ROUTE_LIST = Reflect.getMetadata(SERVER_CONTROLLER_SUB_ROUTE, target.constructor) || ([] as any[])

    SERVER_CONTROLLER_SUB_ROUTE_LIST.push({
      subPath: path,
      callback: description.value,
      methodKey: propertypeKey,
      httpMethod: 'get',
    })

    Reflect.defineMetadata(SERVER_CONTROLLER_SUB_ROUTE, SERVER_CONTROLLER_SUB_ROUTE_LIST, target.constructor)
  }

  return func
}

const Post = (path = '') => {
  const func: MethodDecorator = function (target, propertypeKey, description) {
    console.log(target.constructor, 'Post')

    const SERVER_CONTROLLER_SUB_ROUTE_LIST = Reflect.getMetadata(SERVER_CONTROLLER_SUB_ROUTE, target.constructor) || ([] as any[])

    SERVER_CONTROLLER_SUB_ROUTE_LIST.push({
      subPath: path,
      callback: description.value,
      methodKey: propertypeKey,
      httpMethod: 'post',
    })

    Reflect.defineMetadata(SERVER_CONTROLLER_SUB_ROUTE, SERVER_CONTROLLER_SUB_ROUTE_LIST, target.constructor)
  }

  return func
}

const Requset = () => {
  const func: ParameterDecorator = function (target, propertyKey, index) {
    console.log(target.constructor, 'Requset')

    const SERVER_CONTROLLER_PARAMS_KEY_LIST: string[] = Reflect.getMetadata('paramsKey', target.constructor) || []

    SERVER_CONTROLLER_PARAMS_KEY_LIST.push(`requset/${index}`)

    Reflect.defineMetadata('paramsKey', SERVER_CONTROLLER_PARAMS_KEY_LIST, target.constructor)
  }

  return func
}

const Response = () => {
  const func: ParameterDecorator = function (target, propertyKey, index) {
    console.log(target.constructor, 'response')

    const SERVER_CONTROLLER_PARAMS_KEY_LIST: string[] = Reflect.getMetadata('paramsKey', target.constructor) || []

    SERVER_CONTROLLER_PARAMS_KEY_LIST.push(`response/${index}`)

    Reflect.defineMetadata('paramsKey', SERVER_CONTROLLER_PARAMS_KEY_LIST, target.constructor)
  }

  return func
}

// https://api.oioweb.cn/api/common/HotList

@Controller('/api/common/HotList')
class MockController {
  constructor() {}
  @Get('')
  getData(data: any) {
    console.log('get \n', data, '\n ++++++++++=')
  }

  @Post()
  postData(name: any, @Requset() req: any, @Response() res: any) {
    console.log(name, 'name')

    console.log('post \n', req.end, '\n req++++++++++=')
    console.log('post \n', res.end, '\n res++++++++++=')
  }
}
