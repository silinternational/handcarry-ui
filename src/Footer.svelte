<script>
import { sendMessage } from './gqlQueries'

const newMessage = {
  threadID: "243f36b3-f3da-456b-8f7d-350c413ea65e", 
  content: "Can I transport some for you?",
  senderID: "e97a244f-465a-46c7-b68a-b8bcc0df530d",
  postID: "1"
}
</script>

<footer>
  <button class="btn btn-sm btn-outline-warning m-1 float-right" on:click={() => sendMessage(newMessage)}>send msg (testing)</button>
</footer>
