import {Injectable} from '@angular/core';
import {Block} from '../_models/block';
import {Post} from '../_models/post';

@Injectable({
    providedIn: 'root'
})
export class ComponentService {
    posts: Post[] = [
        {
            id: 1,
            title: 'blog 1',
            description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit dignissimos dolore ducimus eum, excepturi explicabo nostrum obcaecati omnis quod',
            content: 'b1 content',
            image: '',
            alt: '',
            createdAt: '2019-05-06',
            updatedAt: '2019-05-06'

        },
        {
            id: 2,
            title: 'blog 2',
            description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit dignissimos dolore ducimus eum, excepturi explicabo nostrum obcaecati omnis quod',
            content: 'b2 content',
            image: '',
            alt: '',
            createdAt: '2019-05-06',
            updatedAt: '2019-05-06'
        },
        {
            id: 3,
            title: 'blog 3',
            description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit dignissimos dolore ducimus eum, excepturi explicabo nostrum obcaecati omnis quod',
            content: 'b3 content',
            image: '',
            alt: '',
            createdAt: '2019-05-06',
            updatedAt: '2019-05-06'
        },
        {
            id: 15,
            title: 'blog 1',
            description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit dignissimos dolore ducimus eum, excepturi explicabo nostrum obcaecati omnis quod',
            content: 'b3 content',
            image: '',
            alt: '',
            createdAt: '2019-05-06',
            updatedAt: '2019-05-06'
        }
    ];

    blogContent: Post[] = [
        this.posts[0],
        this.posts[1],
        this.posts[2]
    ];
    blogContent2: Post[] = [
        this.posts[3]
    ];
    category = ['blog', 'video', 'image', 'image-text', 'bg-image', 'link'];
    componentSize = ['small', 'middle', 'large'];
    componentBg = ['#ffffff', 'red', 'yellow', 'green', 'brown'];
    blocks: Block[] = [
        {size: 'small', bg: '#B12B2B', category: 'image', content: {img: 'pryanik.PNG', hoverTitle: 'some Title'}},
        {size: 'small', bg: '#ffffff', category: 'blog', content: this.blogContent},
        {size: 'small', bg: '#FF52B5', category: 'image', content: {img: 'cloud.PNG', hoverTitle: 'click me'}},
        {size: 'middle', bg: 'red', category: 'bg-image', content: 'middle.PNG'},
        {size: 'small', bg: '#ffffff', category: 'blog', content: this.blogContent2},
        {
            size: 'small',
            bg: '#000',
            category: 'video',
            content: {video: 'video.mp4', title: 'some text'}
        },
        {size: 'small', bg: 'yellow', category: 'bg-image', content: 'girl.PNG'},
        {
            size: 'small',
            bg: '#000',
            category: 'video',
            content: {video: 'video.mp4', title: 'some biger text'}
        },
        {size: 'small', bg: '#5ED6BF', category: 'image', content: {img: 'textimg.PNG', hoverTitle: 'do good'}},
        {
            size: 'large',
            bg: '#C32C5E',
            category: 'image-text',
            content: {
                img: 'curious.PNG',
                title: 'good curious',
                subTitle: 'we\'re a bunch of',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias animi atque consequatur deleniti est expedita impedit ipsum itaque laboriosam molestiae neque, nihil nisi perferendis porro quibusdam ratione repellendus reprehenderit rerum soluta suscipit vel voluptatem. A commodi iure libero magnam!'
            }
        },
        {size: 'middle', bg: '#FF52B5', category: 'image', content: {img: 'middle.PNG', hoverTitle: 'Cloud'}},
        {
            size: 'small',
            bg: '#000',
            category: 'link',
            content: {
                title: 'Lorem ipsum dolor sit amet, consectetur adipisicing ?',
                link: 'contact us',
                url: 'https://www.facebook.com/'
            }
        },
    ];

    group = [
        {
            type: 'large',
            data: [this.blocks[0], this.blocks[1], this.blocks[2], this.blocks[6], this.blocks[5], this.blocks[8]]
        },
        {type: 'middle', data: [this.blocks[3]]},
        {type: 'large', data: [this.blocks[9]]},
        {type: 'middle', data: [this.blocks[4], this.blocks[2], this.blocks[7], this.blocks[0]]},
    ];

    constructor() {
    }

    getGroup() {
        return this.group;
    }

    getPost(id) {
        return this.posts.find((element) => {
            return element.id == id;
        });
    }

    getBlocks() {
        return this.blocks;
    }

    getFooter() {
       return {type: 'small', data: this.blocks[11]};
    }
}
