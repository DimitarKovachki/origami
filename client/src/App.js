import './App.scss'

import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import * as postService from './services/postService';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Aside from './components/Aside/Aside';
import About from './components/About/About';
import AboutNew from './components/About/AboutNew';
import AboutLayout from './components/About/AboutLayout';
import ContactUs from './components/Contact/Contact';
import CreatePost from './components/CreatePost/CreatePost';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';

// json-server -p 4000 db.json

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      selectedPost: null,
    }
  }

  componentDidMount() {
    postService.getAll().then(posts => {
      this.setState({ posts })
    })
  }

  onAsideItemClick(id) {
    this.setState({ selectedPost: id })
  }

  getPosts() {
    if (!this.state.selectedPost) {
      return this.state.posts
    } else {
      let findPostId = [this.state.posts.find(x => Number(x.id) === this.state.selectedPost)];

      if (findPostId !== undefined) {
        return findPostId;
      }
    }
  }



  render() {
    return (
      <>
        <Header></Header>

        <div className="container">

          <Aside
            onAsideItemClick={this.onAsideItemClick.bind(this)}
            selectedList={this.state.idPost}
          >
          </Aside>
          <Routes>
            <Route path="/" element={
              <Main posts={this.getPosts()}></Main>
            } />

            <Route path="/about" element={<AboutLayout />}>
              <Route index element={<About />} />
              <Route path=":name" element={<About />} />
              <Route path="new" element={<AboutNew />} />
            </Route>
            <Route path='/create/post' element={<CreatePost />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>


        </div>

        <Footer></Footer>
      </>
    );

  }
}

export default App;