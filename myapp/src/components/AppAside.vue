<template>
    <div :class="sidebarClass">
      <li class="menu-item toggle" @click="toggleSidebar">
          <i class="ri-arrow-right-s-line" :class="{'arrow-rotate': isExpanded}"></i>
      </li>
      <ul class="main-feature" :class="{'not-expand': !isExpanded}">
        <li class="menu-item" @click="toggleOptionTraffic">
            <i class="ri-compass-discover-line"></i>
            <span class="menu-text" :class="{'disappear': !isExpanded}">Traffic Info</span>
            <div :class="{'inline-arrow-rotate': OptTrafficIsPutdown}" class = "inline-arrow">
              <i :class="{'ri-arrow-right-s-line ': isExpanded}"></i>
            </div>
            <!-- <div class="popover">Traffic Info</div> -->
        </li>
        <li :class="subMenuTrafficClass">
            <i class="ri-send-plane-line"></i>
            <span>Enter starting point:</span>
            <input class="input-style" type="text" placeholder="corrdinate or place name" v-model="username" required><br>
            <i class="ri-send-plane-line"></i>
            <span>Enter destination:</span>
            <input class="input-style" type="text" placeholder="corrdinate or place name" v-model="password" required><br>
            <button class="button-style" type="submit" @click="submit">Searching</button>
        </li>
        <li class="menu-item" @click="toggleOptionHistory">
            <i class="ri-history-line"></i>
            <span class="menu-text" :class="{'disappear': !isExpanded}">History</span>
            <div :class="{'inline-arrow-rotate': OptHistoryIsPutdown}" class = "inline-arrow">
              <i :class="{'ri-arrow-right-s-line ': isExpanded}"></i>
            </div>
        </li>
        <li :class="{'sub-menu-history': isExpanded && OptHistoryIsPutdown}">
            
        </li>
        <li class="menu-item" @click="toggleOptionLocation">
            <i class="ri-user-location-line"></i>
            <span class="menu-text" :class="{'disappear': !isExpanded}">Current Location</span>
            <div :class="{'inline-arrow-rotate': OptLocationIsPutdown}" class = "inline-arrow">
              <i :class="{'ri-arrow-right-s-line ': isExpanded}"></i>
            </div>
        </li>
        <li :class="{'sub-menu-location': isExpanded && OptLocationIsPutdown}">
            
        </li>
      </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isExpanded: false,
        OptTrafficIsPutdown: false,
        OptHistoryIsPutdown: false,
        OptLocationIsPutdown: false
      };
    },
    computed: {
      sidebarClass() {
        return {
          'sidebar-expanded': this.isExpanded,
          'sidebar-collapsed': !this.isExpanded
        };
      },
      subMenuTrafficClass() {
        return {
          'sub-menu-traffic-expanded': this.isExpanded && this.OptTrafficIsPutdown,
          'sub-menu-collapsed': !(this.isExpanded && this.OptTrafficIsPutdown)
        };
      }
    },
    methods: {
      toggleSidebar() {
        this.isExpanded = !this.isExpanded;
        this.OptHistoryIsPutdown = false;
        this.OptTrafficIsPutdown = false;
        this.OptLocationIsPutdown = false;
      },
      toggleOptionTraffic() {
        this.OptTrafficIsPutdown = !this.OptTrafficIsPutdown;
      },
      toggleOptionHistory() {
        this.OptHistoryIsPutdown = !this.OptHistoryIsPutdown;
      },
      toggleOptionLocation() {
        this.OptLocationIsPutdown = !this.OptLocationIsPutdown;
      }
    }
  };
</script>

<style>
  * {
    margin: 0;
  }

  .sidebar-expanded {
    width: 250px;
    /* 其他样式... */
    background-color: #409EFF;
    height: 100vh;
    border-radius: 8px;
    position: relative;
    transition: 1s;
    padding: 8px;
    box-shadow: 03px 4px 16px rgba(26, 27, 27, 0.4)
  }
  
  .sidebar-collapsed {
    width: 50px;
    /* 其他样式... */
    background-color: #409EFF;
    height:100vh;
    border-radius: 8px;
    position: relative;
    padding: 8px;
    transition: 1s;
    box-shadow: 03px 4px 16px rgba(26, 27, 27, 0.4)
  }

  ul, 
  li {
    padding: 0;
    list-style: none;
  }

  .menu-item {
    height: 45px;
    font-size: 16px;
    color: #f2f6fc;
    align-items: center;
    display: flex;
    justify-content: flex-start;
    position: relative;
    padding: 0 15px;
    border-radius: 8px;
    cursor: pointer;
    border-width: 10px;
    transition: background-color 0.2s ease;
  }
  
  .menu-item i {
    font-size: 20px;
  }

  .menu-item:hover {
    background-color: hsl(211, 96%, 45%);
  }

  .menu-text {
    margin-left: 8px;
  }
  
  .disappear {
    display: none;
  }

  .toggle {
    position: absolute;
    width: calc(100% -8px);
    top: 5px;
    justify-content: center;
  }

  .arrow-rotate {
    transform: rotate(180deg);
  }

  .main-feature {
    position: absolute;
    top: 50px;
    width: 250px;
  }

  .not-expand {
    width: 50px;
  }

  /* .popover {
    position: absolute;
    top: 50%;
    left: calc(100% + 8px);
    transform: translateY(-50%);
    border-radius: 2px;
    background-color: #fff;
    color: #333;
    padding: 8px;
    font-size: 12px;
    display: none;
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1);
  }

  .popover::before {
    content: '';
    border-width: 6px;
    left: -12px;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    border-style: solid;
    border-right-color: #fff;
    border-top-color: transparent;
    border-left-color: transparent;
    border-block-color: transparent;
  } */

  .inline-arrow {
    position: absolute;
    left: 220px;
  }

  .sub-menu-traffic-expanded {
    background-color: #f2f6fc;
    height: 150px;
    transition: 1s ;
    border-radius: 8px;
    padding:20px 35px;
    box-shadow: 03px 4px 16px rgba(26, 27, 27, 0.4)
  }

  .sub-menu-collapsed {
    transition: 1s;
    display: none;
  }

  .sub-menu-history {
    background-color: #f2f6fc;
    height: 100px;
    transition: 0.5s ;
    border-radius: 8px;
    box-shadow: 03px 4px 16px rgba(26, 27, 27, 0.4)
  }

  .sub-menu-location {
    background-color: #f2f6fc;
    height: 100px;
    transition: 0.5s ;
    border-radius: 8px;
    box-shadow: 03px 4px 16px rgba(26, 27, 27, 0.4)
  }

  .inline-arrow-rotate {
    transform: rotate(90deg);
  }

  .input-style {
    margin: 5px 5px 5px 5px;
    height: 25px;
    background-color: hsl(0, 0%, 100%);
    box-shadow: 03px 2px 2px rgba(167, 171, 171, 0.4);
    border-radius: 4px;
    border-style: hidden;
  }

  .button-style {
    width: 120px;
    height: 30px;
    padding: 0;
    margin: 10px 5px 5px 25px;
    background-color: hsl(0, 0%, 100%);
    box-shadow: 03px 2px 2px rgba(167, 171, 171, 0.4);
    border-style: hidden;
    border-radius: 8px;
  }

  .button-style:hover {
    background-color: #87cefa;
  }
</style>
  