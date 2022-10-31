<template>
    <div class="label-float">

        <input :value="modelValue" 
        :type="type" 
        :placeholder="placeholder" 
        @input="updateValue"  />

        <label>{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: 'InputForm',

    props:{
        label:{
            type: String
        },
        type:{
            type: String
        },
        modelValue:{
            type: [String, Number]
        },
        placeholder:{
            type: String
        }
    },
    emits:['update:updateValue'],    
    methods:{
        updateValue($event){
            this.$emit("update:modelValue", $event.target.value)
        }
    }
}
</script>

<style scoped>
    .label-float {
    position: relative;
    padding-top: 13px;
    width: 100%;
    color: #FFF;

}

.label-float input {
    border: 0;
    border-bottom: 2px solid lightgrey;
    outline: none;
    min-width: 180px;
    font-size: 16px;
    transition: all .3s ease-out;
    -webkit-transition: all .3s ease-out;
    -moz-transition: all .3s ease-out;
    border-radius: 0;
    background-color: transparent;
    width: 100%;
    color: #FFF;
    height: 30px;
}

.label-float input:focus {
    border-bottom: 2px solid #d44916;
}

.label-float input::placeholder {
    color: transparent;
}

.label-float label {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 13px;
    transition: all .3s ease-out;
    -webkit-transition: all .3s ease-out;
    -moz-transition: all .3s ease-out;
}

.label-float input:required:invalid+label {
    color: red;
}

.label-float input:focus:required:invalid {
    border-bottom: 2px solid red;
}

.label-float input:required:invalid+label:before {
    content: '*';
}

.label-float input:focus+label,
.label-float input:not(:placeholder-shown)+label {
    font-size: 13px;
    margin-top: 0;
    color: #d44916;
}

</style>