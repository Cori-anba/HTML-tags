import json
import os
import sys

# Global attributes block (appended to every tag)
GLOBAL_ATTRS = [
    {"name":"id","star":True,"explain":"元素的唯一标识符","english":"identifier n.标识符","values":[{"value":"自定义字符串","english":"","note":"同一页面中 id 必须唯一"}]},
    {"name":"class","star":True,"explain":"元素的类名","english":"class n.类别","values":[{"value":"类名字符串","english":"","note":"多个类名用空格隔开"}]},
    {"name":"style","star":True,"explain":"内联CSS样式","english":"style n.样式","values":[{"value":"CSS声明","english":"","note":"优先级高于外部样式表"}]},
    {"name":"title","star":False,"explain":"鼠标悬停提示文本","english":"title n.提示","values":[{"value":"任意文本字符串","english":"","note":"悬停时显示为tooltip"}]},
    {"name":"lang","star":False,"explain":"元素内容的语言代码","english":"language n.语言","values":[{"value":"语言代码(如en/zh-CN)","english":"","note":"遵循ISO 639-1标准"}]},
    {"name":"dir","star":False,"explain":"文本书写方向","english":"direction n.方向","values":[{"value":"ltr","english":"left to right 从左到右","note":"默认值"},{"value":"rtl","english":"right to left 从右到左","note":""},{"value":"auto","english":"automatic 自动检测","note":""}]},
    {"name":"hidden","star":True,"explain":"隐藏元素","english":"hidden adj.隐藏的","values":[{"value":"hidden (布尔属性)","english":"","note":"元素不渲染且不可见"}]},
    {"name":"tabindex","star":False,"explain":"Tab键导航顺序","english":"tab index 制表索引","values":[{"value":"0","english":"","note":"可聚焦，按DOM顺序"},{"value":"正整数","english":"","note":"不推荐，破坏自然顺序"},{"value":"-1","english":"","note":"不可Tab聚焦，但可JS聚焦"}]},
    {"name":"accesskey","star":False,"explain":"键盘快捷键","english":"access key 访问键","values":[{"value":"单字符","english":"","note":"不同系统触发组合键不同"}]},
    {"name":"contenteditable","star":False,"explain":"内容是否可编辑","english":"content editable 内容可编辑","values":[{"value":"true","english":"","note":"可编辑"},{"value":"false","english":"","note":"默认，不可编辑"}]},
    {"name":"draggable","star":False,"explain":"元素是否可拖拽","english":"draggable adj.可拖拽的","values":[{"value":"true","english":"","note":"可拖拽"},{"value":"false","english":"","note":"默认，不可拖拽"},{"value":"auto","english":"","note":"浏览器默认行为"}]},
    {"name":"spellcheck","star":False,"explain":"是否拼写检查","english":"spell check 拼写检查","values":[{"value":"true","english":"","note":"启用拼写检查"},{"value":"false","english":"","note":"禁用拼写检查"}]},
    {"name":"data-*","star":True,"explain":"自定义数据属性","english":"data attribute 数据属性","values":[{"value":"data-自定义名称=\"值\"","english":"","note":"通过JS的dataset访问"}]},
    {"name":"role","star":False,"explain":"ARIA语义角色","english":"role n.角色","values":[{"value":"具体角色值","english":"","note":"参考WAI-ARIA规范"}]},
    {"name":"aria-*","star":False,"explain":"ARIA状态与属性","english":"Accessible Rich Internet Applications","values":[{"value":"aria-label等","english":"","note":"为辅助技术提供信息"}]},
    {"name":"translate","star":False,"explain":"是否允许翻译","english":"translate v.翻译","values":[{"value":"yes","english":"","note":"默认，允许翻译"},{"value":"no","english":"","note":"禁止翻译"}]},
    {"name":"inert","star":False,"explain":"使元素不可交互","english":"inert adj.惰性的","values":[{"value":"inert (布尔属性)","english":"","note":"元素对用户交互完全不可操作"}]}
]

def make_tag(name, english_name, chinese_desc, is_double, description, specific_attrs, css_properties, related_tags):
    """Build a complete tag entry with global attributes appended."""
    attrs = specific_attrs + GLOBAL_ATTRS
    return {
        "name": name,
        "englishName": english_name,
        "chineseDesc": chinese_desc,
        "isDouble": is_double,
        "description": description,
        "attributes": attrs,
        "cssProperties": css_properties,
        "relatedTags": related_tags
    }

data = {}
