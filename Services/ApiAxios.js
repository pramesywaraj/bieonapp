import axios from 'axios'

export default class ApiAxios {
    getArticle() {
        return this.get(base_url + 'article/list')
    }
}