<script>
import { posts, post, sendMessage } from './gqlQueries'

const newPost = {
  orgID: "67356899-a02c-44dd-97df-c7bdb47d11ca", 
  createdByID: "e99421ee-7ca2-4c49-8ba5-21f51db53c3d",
  type: "REQUEST",
  title: "I need grape Jelly", 
  description: "Five jars please, if you can.", 
  origin: "WAXHAW", 
  size: "medium"
}

const newMessage = {
  threadID: "243f36b3-f3da-456b-8f7d-350c413ea65e", 
  content: "Can I transport some for you?",
  senderID: "e97a244f-465a-46c7-b68a-b8bcc0df530d",
  postID: "1"
}
</script>

<footer class="fixed-bottom bg-secondary">
  <button class="btn btn-sm btn-outline-warning m-1 float-right" on:click={() => post(newPost)}>post (testing)</button>
  <button class="btn btn-sm btn-outline-warning m-1 float-right" on:click={() => sendMessage(newMessage)}>send msg (testing)</button>
</footer>
