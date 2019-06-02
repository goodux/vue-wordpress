const site_url = 'http://localhost';
const posts_endpoint = '/wp-json/wp/v2/posts';
const categories_endpoint = '/wp-json/wp/v2/categories';

Vue.component('posts-block', {
	template: '#post-template',
	props: {
		post: {
			id: Number,
			title: {
				rendered: String
			},
			content: {
				rendered: String
			}
		}
	}
})

Vue.component('post-category', {
	template: '<button>{{ category.name }}</button>',
	props: {
		category: {
			id: Number,
			name: String
		}
	}
})

new Vue({
	el: '#app',
	data: {
		site_url: 'http://localhost',
		categories: null,
		posts: null
	},
	mounted() {

		// get posts
		axios
			.get(this.site_url+posts_endpoint)
			.then(response => {
				this.posts = response.data
			})
			.catch(error => {
				console.log(error)
				this.errored = true
			})
			.finally(() => this.loading = false)

		//get categories
		axios
			.get(this.site_url+categories_endpoint)
			.then(response => {
				console.log(response.data)
				this.categories = response.data
			})
			.catch(error => {
				console.log(error)
				this.errored = true
			})
			.finally(() => this.loading = false)
	}
})