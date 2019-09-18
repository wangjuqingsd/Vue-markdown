var markdown = new Vue({
    el:"#notebook",
   data(){
       return {
           notes:this.getNotes(),
           selectedId:"",


       }

   },
    computed:{
        addButtonTitle(){
            return this.notes.length+"条笔记";
        },
        selectedNote () {
            // We return the matching note with selectedId
            return this.notes.find(note => note.id === this.selectedId)
        },
        notePreview () {
            // Markdown rendered to HTML
            return this.selectedNote ? marked(this.selectedNote.content) : ''
        },
        sortedNotes(){
            return this.notes.slice()
                .sort((a,b)=>a.created-b.created)
                .sort((a,b)=>(a.favorite === b.favorite)?0:a.favorite?-1:1);
        },
        lineCount(){
            if(this.selectedNote){
                return this.selectedNote.content.split(/\r\n|\r|\n/).length;
            }else{
                return 0;
            }
        },
        wordsCount(){
            if(this.selectedNote){
                return 1;
            }else{
                return 0;
            }
        },
        charactersCount(){

        }
    },
    loading(){

    },
    created(){
        this.selectedId = this.notes[0].id;

    },
    methods:{
        favoriteNote(){
            this.selectedNote.favorite ^= true;
        },
        getNotes(){
            return JSON.parse(localStorage.getItem('multi'))||[{id:'123',title:'初始文章',content:"**默认征文**",favorite: false,created:Date.now()}];
        },
        addNote(){
            const time = Date.now();
            var note = {
                id:String(time),
                title:"标题",
                content:"**默认正文**",
                favorite: false,
                created:time
            }
            this.notes.push(note);
        },
        selectNote(note){
            // 选中笔记时
            this.selectedId = note.id;
        },
        deleteNote(){
            var index = this.notes.indexOf(this.selectedNote);
            console.log(index);
            if(index>-1){
                this.notes.splice(index,1);
            }
            this.selectedId = this.notes.slice(0,1)[0].id;
        },
        saveNotes(){
            localStorage.setItem('multi',JSON.stringify(this.notes));
        }
    },
    watch:{
        notes:{
            handler:'saveNotes',
            deep:true
        }
    }
});