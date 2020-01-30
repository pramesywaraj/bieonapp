import axios from 'axios'

const base_url = 'bieonbe.defuture.tech/'

export default class ApiAxios {
    getArticle() {
        return this.get(base_url + 'article/list')
    }
}