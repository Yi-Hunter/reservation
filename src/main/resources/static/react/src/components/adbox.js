import {Component} from 'react';
import '../css/app.css';
import $ from 'jquery';
import req from '../url';
import {
    Button,
    Card,
    Cascader,
    Divider,
    Input,
    InputNumber,
    Layout,
    Modal,
    notification,
    Popconfirm,
    Table
} from 'antd';

const Search = Input.Search;
class Adbox extends Component {
  constructor (props) {
    super(props);
    this.locationOpt = [{
      value: 1,
      label: '二楼北'
    }, {
      value: 2,
      label: '二楼南'
    }, {
      value: 3,
      label: '三楼北'
    }, {
      value: 4,
      label: '三楼南'
    }, {
      value: 0,
      label: '全部'
    }];
    this.statusOpt = [{
      value: 0,
      label: '可分配'
    }, {
      value: 1,
      label: '已分配'
    }, {
      value: 2,
      label: '已保留'
    }, {
      value: 3,
      label: '全部'
    }];
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      confirmLoading: false,
      visible: false,
      data: [{
        key: 1,
        name: 'Edward King 1',
        age: 32,
        address: 'London, Park Lane no. 1',
      }],
        location: 0,
        status: 3,
        startId: 0,
        endId: 0,
        studentId: 0,
        toStu: ""
    };
    this.columns = [{
      title: '区域',
      dataIndex: 'location',
    }, {
      title: '编号',
      dataIndex: 'id',
    }, {
      title: '状态',
      dataIndex: 'status',
    },{
      title: '使用者学号',
      dataIndex: 'studentId'
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          < Popconfirm title = "确定保留该书包柜?" onConfirm = {();
  =>
      this.handleSave(record.id)
  }
      okText = "确定";
      cancelText = "取消" >
          < a;
      href = "javascript:;" > 保留 < /a>
        </Popconfirm>
          < Divider;
      type = "vertical" / >
          < Popconfirm;
      title = "确定释放该书包柜?";
      onConfirm = {();
  =>
      this.handleRelease(record.id)
  }
      okText = "确定";
      cancelText = "取消" >
          < a;
      href = "javascript:;" > 释放 < /a>
        </Popconfirm>
          < Divider;
      type = "vertical" / >
          < Popconfirm;
      title = "确定分配该书包柜?";
      onConfirm = {();
  =>
      this.handleOrder(record.id)
  }
      okText = "确定";
      cancelText = "取消" >
          < a;
      href = "javascript:;" > 分配 < /a>
        </Popconfirm>
          < /span>;
      )
  }]
      this.search = () => {
      var data = '';
      if((this.state.location != 0) && ((this.state.status != 3) || ((this.state.startId != 0) && (this.state.endId != 0)) || (this.state.studentId != 0)))
      {
        data += 'location='+this.state.location+'&';
      }
      else if (this.state.location != 0)
      {
        data += 'location='+this.state.location;
      }

      if((this.state.status != 3) && (((this.state.startId != 0) && (this.state.endId != 0)) || (this.state.studentId != 0)))
      {
        data += 'status='+this.state.status+'&';
      }
      else if(this.state.status != 3)
      {
        data += 'status='+this.state.status;
      }
      if((this.state.startId != 0) && (this.state.endId != 0)  && (this.state.studentId != 0) && (this.state.studentId))
      {
        data += 'id='+this.state.startId+'-'+this.state.endId+'&';
      }
      else if((this.state.startId != 0) && (this.state.endId != 0))
      {
        data += 'id='+this.state.startId+'-'+this.state.endId;
      }
      if((this.state.studentId != 0) && (this.state.studentId))
      {
        data += 'studentId='+this.state.studentId;
      }
      this.setState({
        dataStr: data
      });
      if(data != '')
      {
        $.ajax({
          type: 'GET',
          url: req+'detail?'+data,
          contentType: 'application/json;charset=UTF-8',
          headers: {
            'token': $.cookie('token')
          },
          success: function(res) {
            if(res.code === 0) {
              var data = [];
              data = res.data.ships;
              this.setState({
                totalPage: data.totalPage
              });
              for(let i = 0;i < res.data.ships.length; i ++)
              {
                if(res.data.ships[i].status == 0) {
                  data[i].status = "可分配";
                  data[i].studentId = "无";
                }
                else if((res.data.ships[i].status == 1) && (res.data.ships[i].studentId == "")) {
                  data[i].status = "已保留";
                  data[i].studentId = "无";
                }
                else if(res.data.ships[i].status == 1) {
                  data[i].status = "已分配";
                }
                switch (res.data.ships[i].location) {
                  case 1:
                    data[i].location = "二楼北";
                    break;
                  case 2:
                    data[i].location = "二楼南";
                    break;
                  case 3:
                    data[i].location = "三楼北";
                    break;
                  case 4:
                    data[i].location = "三楼南";
                    break;
                  
                }
              }
              this.setState({
                data: data,
                nowPage: res.data.pages.nowPage,
                pageSize: res.data.pages.pageSize,
                totalPage: res.data.pages.totalPage,
                totalSize: res.data.pages.totalSize
              });
            }
            else if(res.code != 0) {
              notification.open({
                message: '提示',
                description: res.message
              });
            }
          }.bind(this)
        });
      }
      else {
        $.ajax({
          type: 'GET',
          url: req+'detail',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            'token': $.cookie('token')
          },
          success: function(res) {
            if(res.code === 0) {
              var data = [];
              data = res.data.ships;
              for(let i = 0;i < res.data.ships.length; i ++)
              {
                if(res.data.ships[i].status == 0) {
                  data[i].status = "可分配";
                  data[i].studentId = "无";
                }
                else if((res.data.ships[i].status == 1) && (res.data.ships[i].studentId == "")) {
                  data[i].status = "已保留";
                  data[i].studentId = "无";
                }
                else if(res.data.ships[i].status == 1) {
                  data[i].status = "已分配";
                }
                switch (res.data.ships[i].location) {
                  case 1:
                    data[i].location = "二楼北";
                    break;
                  case 2:
                    data[i].location = "二楼南";
                    break;
                  case 3:
                    data[i].location = "三楼北";
                    break;
                  case 4:
                    data[i].location = "三楼南";
                    break;
                }
              }
              this.setState({
                data: data,
                nowPage: res.data.pages.nowPage,
                pageSize: res.data.pages.pageSize,
                totalPage: res.data.pages.totalPage,
                totalSize: res.data.pages.totalSize
              });
            }
            else if(res.code != 0) {
              notification.open({
                message: '提示',
                description: res.message
              });
            }
          }.bind(this)
        });
      }
    };
    this.pageChange = (page, pageSize) => {
      $.ajax({
          type: 'GET',
          url: req+'detail?'+this.state.dataStr+'&page='+page,
          contentType: 'application/json;charset=UTF-8',
          headers: {
            'token': $.cookie('token')
          },
          success: function(res) {
            if(res.code === 0) {
              var data = [];
              data = res.data.ships;
              for(let i = 0;i < res.data.ships.length; i ++)
              {
                if(res.data.ships[i].status == 0) {
                  data[i].status = "可分配";
                  data[i].studentId = "无";
                }
                else if((res.data.ships[i].status == 1) && (res.data.ships[i].studentId == "")) {
                  data[i].status = "已保留";
                  data[i].studentId = "无";
                }
                else if(res.data.ships[i].status == 1) {
                  data[i].status = "已分配";
                }
                switch (res.data.ships[i].location) {
                  case 1:
                    data[i].location = "二楼北";
                    break;
                  case 2:
                    data[i].location = "二楼南";
                    break;
                  case 3:
                    data[i].location = "三楼北";
                    break;
                  case 4:
                    data[i].location = "三楼南";
                    break;
                  
                }
              }
              this.setState({
                data: data,
                nowPage: res.data.pages.nowPage,
                pageSize: res.data.pages.pageSize,
                totalPage: res.data.pages.totalPage,
                totalSize: res.data.pages.totalSize
              });
            }
            else if(res.code != 0) {
              notification.open({
                message: '提示',
                description: res.message
              });
            }
          }.bind(this)
        });
    };
    this.releaseSelect = () => {
      $.ajax({
          type: 'DELETE',
          url: req+'ship',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            'token': $.cookie('token')
          },
          data: JSON.stringify(this.state.someData),
          success: function(res) {
            if(res.code == 0)
            {
              notification.open({
                message: '提示',
                description: '释放成功！'
              });
            }
            else {
              notification.open({
                message: '提示',
                description: res.message
              });
            }
          }.bind(this)
      });

    };
    this.releaseAll = () => {
      $.ajax({
          type: 'DELETE',
          url: req+'ship',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            'token': $.cookie('token')
          },
          data: JSON.stringify([]),
          success: function(res) {
            if(res.code == 0)
            {
              notification.open({
                message: '提示',
                description: '释放成功！'
              });
            }
            else {
              notification.open({
                message: '提示',
                description: res.message
              });
            }
          }.bind(this)
      });
    };
    this.saveSelect = () => {
      $.ajax({
          type: 'POST',
          url: req+'preorder',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            'token': $.cookie('token')
          },
          data: JSON.stringify(this.state.someData),
          success: function(res) {
            if(res.code == 0)
            {
              notification.open({
                message: '提示',
                description: '预留成功！'
              });
            }
            else {
              notification.open({
                message: '提示',
                description: res.message
              });
            }
          }.bind(this)
      });
    };
    this.handleSave = (key) => {
      var data = [];
      data.push(key);
      $.ajax({
          type: 'POST',
          url: req+'preorder',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            'token': $.cookie('token')
          },
          data: JSON.stringify(data),
          success: function(res) {
            if(res.code == 0)
            {
              notification.open({
                message: '提示',
                description: '预留成功！'
              });
            }
            else {
              notification.open({
                message: '提示',
                description: res.message
              });
            }
          }.bind(this)
      });
    };
    this.orderBox = (value) => {
      $.ajax({
          type: 'PUT',
          url: req+'ship',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            'token': $.cookie('token')
          },
          data: JSON.stringify({
            number: this.state.toBox,
            studentId: value
          }),
          success: function(res) {
            if(res.code == 0)
            {
              notification.open({
                message: '提示',
                description: '分配成功！'
              });
              this.setState({
                visible: false
              })
            }
            else {
              notification.open({
                message: '提示',
                description: res.message
              });
            }
          }.bind(this)
      });
    };
    this.handleOrder = (key) => {
      this.setState({
        visible: true,
        toBox: key
      });
    };
    this.handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
  };
  this.handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
    this.handleRelease = (key) => {
      var data = {
        number: key,
        studentId: ""
      };
      $.ajax({
          type: 'PUT',
          url: req+'ship',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            'token': $.cookie('token')
          },
          data: JSON.stringify(data),
          success: function(res) {
            if(res.code == 0)
            {
              notification.open({
                message: '提示',
                description: '释放成功！'
              });
            }
            else {
              notification.open({
                message: '提示',
                description: res.message
              });
            }
          }.bind(this)
      });
    };
    this.hide = () => {
      this.setState({
        visible: false,
      });
    };

    this.handleVisibleChange = (visible) => {
      this.setState({ visible });
    };
    this.locationChange = (value) => {
    };
    this.statusChange = (value) => {
    };
    this.onSelectChange = (selectedRowKeys,selectedRows) => {
      var data = [];
      for(let i = 0; i <selectedRows.length; i++)
      {
        data.push(selectedRows[i].id);
      }
      this.setState({ selectedRowKeys });
      this.setState({
        someData: data
      });
    };
  }
  
  componentDidMount () {
   
  }
  render() {
    const { visible, confirmLoading } = this.state;
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    let pagination = {
      current: this.state.nowPage,
      pageSize: this.state.pageSize,
      total: this.state.totalSize,
      onChange: this.pageChange
    };
    return (
        < Layout;
      style = {;
      {
          '24px 30px 24px'
      }
  }>
  <
      Card;
      style = {;
      {
          16
      }
  }>
        <p>
      < span > 筛选;：<
      /span>
      < span > 区域;：<
      /span>
      < Cascader;
      style = {;
      {
          "110px"
      }
  }
      defaultValue = {[this.state.location]};
      allowClear = {false};
      options = {this.locationOpt};
      onChange = {(value);
  =>
      this.setState({location: value})
  }
      /><Divider type="vertical" / >
      < span > 状态;：<
      /span>
      < Cascader;
      defaultValue = {[this.state.status]};
      allowClear = {false};
      options = {this.statusOpt};
      onChange = {(value);
  =>
      this.setState({status: value})
  }
      /><Divider type="vertical" / >
      < span > 编号;：<
      /span>
      < InputNumber;
      onChange = {(value);
  =>
      this.setState({startId: value ? value : 0})
  }
      /> 至 <InputNumber onChange={(value)=>this.setState({endId:value?value:0})} / > < Divider;
      type = "vertical" / >
          < span > 学号;：<
      /span>
      < InputNumber;
      style = {;
      {
          "140px"
      }
  }
      onChange = {(value);
  =>
      this.setState({studentId: value ? value : 0})
  }
      />
      < Button;
      type = "primary";
      style = {;
      {
          '20px'
      }
  }
      onClick = {this.search} > 查询 < /Button>
          </p>
          <p>
          < span > 批量操作;：<
      /span>
      < Popconfirm;
      title = "确定释放所选书柜?";
      onConfirm = {this.releaseSelect};
      okText = "确定";
      cancelText = "取消" >
          < a;
      href = "javascript:;" > 释放所选书柜 < /a>
          </Popconfirm>
          < Divider;
      type = "vertical" / >
          < Popconfirm;
      title = "确定保留所选书柜?";
      onConfirm = {this.saveSelect};
      okText = "确定";
      cancelText = "取消" >
          < a;
      href = "javascript:;" > 保留所选书柜 < /a>
          </Popconfirm>
          < Divider;
      type = "vertical" / >
          < Popconfirm;
      title = "确定释放所有书柜?";
      onConfirm = {this.releaseAll};
      okText = "确定";
      cancelText = "取消" >
          < a;
      href = "javascript:;" > 释放所有书柜 < /a>
          </Popconfirm>
          </p>

          < Table;
      rowSelection = {rowSelection};
      columns = {this.columns};
      dataSource = {this.state.data};
      pagination = {pagination};
      />
      < div;
      style = {;
      {
          -50
      }
  }>
  <
      span;
      style = {;
      {
          8
      }
  }>
      当前查询结果共计;
      {
          this.state.totalSize ? this.state.totalSize : 0
      }
      条;，{
          this.state.totalPage ? this.state.totalPage : 0
      }
      页
          </span>
      < span;
      style = {;
      {
          8
      }
  }>
            {hasSelected ? `已选中 ${selectedRowKeys.length} 项` : ''}
          </span>
         </div>
      < Modal;
      mask = {false};
      title = "把该书包柜分配给：";
      visible = {visible};
      onOk = {this.handleOk};
      confirmLoading = {confirmLoading};
      onCancel = {this.handleCancel};
          footer= {false}
          
        >
              < Search;
      style = {;
      {
          "100%"
      }
  }
      placeholder = "请输入学生学号";
      enterButton = "确定";
      onSearch = {this.orderBox};
            />
        </Modal>
        </Card>
            < /Layout>;
  )
  }
}

export default Adbox;