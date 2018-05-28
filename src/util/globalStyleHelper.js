import $ from "jquery";

/**
 * 动态设置样式，改变组件的背景颜色
 * @param {String} value 全局颜色值
 */
function docsStyle(value) {
  // 动态添加样式
  return `
    /** 顶部tabes选中时，聚焦时的样式 **/
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active , .el-tabs--border-card>.el-tabs__header .el-tabs__item:hover {
      color: ${value} !important;
    }
    /** pagger当前页的样式 **/
    .el-pager li.active {
      background-color: ${value} !important;
    }
    /** checkbox选中时，table顶部全选选中时的样式 **/
    .el-checkbox__input.is-checked .el-checkbox__inner, 
    .el-checkbox__input.is-indeterminate .el-checkbox__inner
     {
      background-color: ${value} !important;
      border-color: ${value} !important;
    }
    /** checkbox聚焦时，鼠标移入时的样式 **/
    .el-checkbox__input.is-focus .el-checkbox__inner , .el-checkbox__input:hover .el-checkbox__inner {
      border-color: ${value} !important;
    }
    /** checkbox选中时，右侧文本的样式 **/
    .el-checkbox.is-checked .el-checkbox__label {
      color: ${value} !important; 
    }
    /** 输入框聚焦时的样式 **/
    input:focus {
      border-color: ${value} !important; 
    }
    /** 所有el-button type="self"时的样式 **/
    .el-button--self {
      background-color: ${value} !important;
      color: #fff !important;
      border-color: #fff !important;
    }
    /** 提示框中的按钮样式 **/
    .el-message-box__btns .el-button--self {
      border-color: ${value} !important;
    }
    `;
}

/**
 * 设置全局样式颜色
 * @param {String} globalColor 全局颜色值
 */
function setGlobalStyle(globalColor) {
  // 改变无法通过组件接口改变的背景颜色
  $("#docs-style").html(docsStyle(globalColor));

  // TO-DO 全局颜色提交到后台保存
  // alert(`选择的主题颜色值：${globalColor}，可以提交到后台保存`);
}

export default {
  setGlobalStyle,
}
