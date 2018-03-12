<template>
    <div>
       <h1>简易超市系统</h1> 
       <span>admin</span>&nbsp;，&nbsp;<i>欢迎您</i>&nbsp;！&nbsp;
       <a href="http://localhost:8080/#/login">退出登录</a>
       <div class="lan">
           <label>语言：</label>

            <select class="form-control form-control-sm"  v-model="$store.state.common.lanType">
               <option value="en">en</option>
               <option value="cn">cn</option>
           </select>
       </div>
       
       
    </div>
</template>

<script type="text/javascript">
    export default {}
</script>