import uuid from 'uuid/v4'

const Task = function(value, done){
    this.id = uuid()
    this.value = value
    this.done = done
}

export default Task;