/**
 * @class Ext.global.plugin.MenuViewTop
 * @extends Ext.form.Panel
 * @author Jim
 */
Ext.define('Ext.global.plugin.MenuViewTop', {
    extend: 'Ext.Container',
    xtype: 'MenuViewTop',
    config: {
        autoScroll: false,
        border: false,
        layout: 'fit',
        baseCls: "stlmenu"
    },
    configMenu: {
        start: false,
        close: false,
        heightInit: 33, //35
        heightEnd: 300
    },
    id: '',
    constructor: function(config) {

        var me = this;
        me.config_ = config;
        me.id = config.id;
        me.items = [
            {
                xtype: 'tabpanel',
                id: me.id + 'tab-panel',
                height: me.configMenu.heightInit,
                width: '100%',
                border: false,
                bodyCls: 'transparent',
                defaults: {
                    bodyPadding: 0,
                    scrollable: true,
                    border: false,
                    bodyCls: 'transparent',
                    listeners: {
                        activate: function(tab, eOpts) {
                            //alert(tab.title + ' activate');
                        }
                    }
                },
                listeners: {
                    tabchange: function() {
                        /*if(!me.configMenu.close || !me.configMenu.start)me.getCloseMenu();
                         Ext.getCmp(me.id+'tab-panel').doLayout();*/
                    },
                    afterrender: function(obj) {
                        me.getRecursivo(Ext.decode(Ext.encode(me.getDataTree())), []);
                        this.items.each(function(i) {
                            i.tab.on('click', function() {
                                if (!me.configMenu.close || !me.configMenu.start)
                                    me.getCloseMenu();
                                Ext.getCmp(me.id + 'tab-panel').doLayout();
                            });
                        });
                        Ext.create('Ext.form.Panel', {
                            layout: 'column',
                            title: '',
                            renderTo:me.id + 'tab-panel',
                            baseCls: 'x-bar-p-x',
                            bodyPadding: 5,
                            border:false,
                            width: 80,
                            items:[
                                {
                                    xtype: 'button',
                                    id: me.id + 'btnHome',
                                    iconCls:'menu-bar-exit',
                                    width: 30,
                                    baseCls: 'x-sty-btn',
                                    text: '',
                                    //width: '100%',
                                    height: me.configMenu.heightInit,
                                    listeners: {
                                        beforerender: function(obj, opts) {
                                        },
                                        click: function(obj, e) {
                                            alert('cliiiick');
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: me.id + 'btnExit',
                                    width: 30,
                                    baseCls: 'x-sty-btn',
                                    iconCls:'menu-bar-exit',
                                    text: '',
                                    //width: '100%',
                                    height: me.configMenu.heightInit,
                                    listeners: {
                                        beforerender: function(obj, opts) {
                                        },
                                        click: function(obj, e) {
                                            alert('cliiiick EXIT_SA');
                                        }
                                    }
                                }
                            ]
                        });
                    }
                },
                bbar: [
                    '->',
                    {
                        xtype: 'button',
                        id: me.id + '-button-close',
                        iconCls: 'big-button-image',
                        hidden: true,
                        width: '100%',
                        //text:'cerrar',
                        listeners: {
                            click: function() {
                                me.getCloseMenu();
                            }
                        }
                    },
                    '->'
                ]
            }
        ];
        me.callParent();
    },
    getRecursivo: function(data, array) {
        var me = this;
        if (data.children.length === 0) {
            Ext.getCmp(me.id + 'tab-panel').add(array);
            Ext.getCmp(me.id + 'tab-panel').doLayout();
        } else {
            var tree = [];
            me.getRecursivoTree(data.children[0].children, tree);
            array.push(
                    {
                        title: data.children[0].text,
                        id: me.id + data.children[0].id,
                        bodyCls: 'transparent', padding: 0,
                        border: false,
                        autoScroll: true,
                        layout: {
                            type: 'hbox',
                            pack: 'center',
                            flex: 1
                                    //align: 'middle'
                        },
                        items: tree

                    });
            data.children.splice(0, 1);
            me.getRecursivo(data, array);
        }
    },
    getRecursivoTree: function(children, array) {
        var me = this;
        if (children.length !== 0) {
            array.push({
                xtype: 'treepanel',
                margin: '-1px 20px 0px 20px',
                baseCls: "navpanel",
                bodyCls: 'transparent',
                viewConfig: {baseCls: ""},
                bodyStyle: 'background: transparent !important;',
                scrollable: false, flex: 1, border: false, rootVisible: false, root: children[0],
                listeners: {
                    'itemclick': function(view, record, item, idx, event, opts) {
                        //alert(record.get("text"));
                        console.log(record);
                        console.log(record.data.url);
                        try {
                            if (record.data.url !== "") {
                                Ext.fly('title_header').update(record.data.text);
                                win.show({vurl: record.data.url, id_menu: 17, class: ''});//tmp
                                me.getCloseMenu();
                            } else {
                                global.Msg({
                                    msg: 'No existe url',
                                    icon: 0,
                                    fn: function() {
                                    }
                                });
                            }
                        } catch (err) {
                            console.log(err);
                            global.Msg({
                                msg: 'No existe url',
                                icon: 0,
                                fn: function() {
                                }
                            });
                        }
                    }
                }
            });
            children.splice(0, 1);
            me.getRecursivoTree(children, array);
        }
    },
    getCloseMenu: function() {
        var me = this;
        var menu = Ext.getCmp(me.id + 'tab-panel');
        menu.animate({
            duration: 400,
            to: {
                height: ((me.configMenu.close) ? me.configMenu.heightInit : me.configMenu.heightEnd)
            },
            callback: function() {
                me.configMenu.start = true;
                me.configMenu.close = !me.configMenu.close;
                Ext.getCmp(me.id + '-button-close').setVisible(me.configMenu.close);
                if (!me.configMenu.close) {
                    var id = Ext.getCmp(inicio.id + 'tab-panel').getActiveTab().tab.id;
                    $("#" + id).removeClass("x-tab-active");
                    menu.setActiveTab(false);
                }

            }
        });
        menu.doLayout();
    },
    getDataTree: function() {//function tmp
        return {
            "text": "PADRE",
            "expanded": true,
            "children": [
                {
                    "text": "SALES",
                    "id":"tab-1",
                    "expanded": true,
                    "children": [
                        {
                            "text": "TREE1",
                            "expanded": true,
                            "children": [
                                {
                                    "text": "INPUT",
                                    "iconCls":"play-icon",
                                    "expanded": true,
                                    "children": [
                                        { "leaf":true,"iconCls":"play-down-icon", "text": "ARC" },
                                        { "leaf":true,"iconCls":"play-down-icon", "text": "BSP" },
                                        { "leaf":true,"iconCls":"play-down-icon", "text": "ASR" }
                                    ]
                                }
                            ]
                        },
                        {
                            "text": "TREE2",
                            "expanded": true,
                            "children": [
                                {
                                    "text": "SALES CONTROL",
                                    "expanded": true,
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Sales Report" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Conciliation ARC" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Conciliation BSP" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Conciliation ASR" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Control Figures" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "View Tic ket" }
                                    ]
                                }
                            ]
                        },
                        {
                            "text": "TREE3",
                            "expanded": true,
                            "children": [
                                {
                                    "text": "MASTER TABLE",
                                    "iconCls":"play-icon",
                                    "expanded": true,
                                    "children": [
                                        { "iconCls":"play-icon","expanded": true,"text": "Geography" ,"children": [
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Country Master File" ,"url":"sales/countrymasterfile"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "City & Airports Master File" ,"url":"sales/cityairportsmasterfile"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Regions Master File" ,"url":"sales/regionsmasterfile"}
                                        ]},
                                        { "iconCls":"play-icon","expanded": true,"text": "PMP / RAM" ,"children": [
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Provisos" ,"url":"sales/provisos"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Provisos Text" ,"url":"sales/provisostext"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Resolution 024" ,"url":"sales/resolution024"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Proration Factors PMP" ,"url":"sales/prorationfactorspmp"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Airline Master File" ,"url":"sales/airlinemasterfile"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Base Amount PMP" ,"url":"sales/baseamountpmp"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Minimun Rule" ,"url":"sales/minimunrule"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Code Shared" ,"url":"sales/codeshared"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Tax RATD" ,"url":"sales/taxratd"}
                                        ]},
                                        { "iconCls":"play-icon","expanded": true,"text": "Sales" ,"children": [
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Tax TTBS" ,"url":"sales/taxttbs"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Calendar ARC" ,"url":"sales/calendararc"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Calendar BSP" ,"url":"sales/calendarbsp"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Calendar ASR" ,"url":"sales/calendarasr"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Fare Master File" ,"url":"sales/faremasterfile"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Form Passenger Traffic File (Airline)" ,"url":"sales/fptfal"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Form Passenger Traffic File (Best practice)" ,"url":"sales/fptfbp"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Agents Master File" ,"url":"sales/agentsmasterfile"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Rates of Exchange" ,"url":"sales/ratesofexchange"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Fare Basis" ,"url":"sales/farebasis"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Master EMD-Subcode" ,"url":"sales/masteremd"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Master BUNDLES" ,"url":""}
                                        ]},
                                        { "iconCls":"play-icon","expanded": true,"text": "Audit" ,"children": [
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Tour Code (IT)" ,"url":"sales/tourcode"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Panic Value" ,"url":"sales/panicvalue"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Discount Type" ,"url":"sales/discounttype"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Miscellaneous" ,"url":"sales/miscellaneous"}
                                        ]},
                                        { "iconCls":"play-icon","expanded": true,"text": "Accounting" ,"children": [
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Accounting Master Sales" ,"url":"sales/accountingmastersales"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Accounting Master Tax" ,"url":"sales/accountingmastertax"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Accounting Master Client" ,"url":"sales/accountingmasterclient"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Accounting Supplier" ,"url":"sales/accountingsupplier"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Accounting Master CCAM" ,"url":"sales/accountingmasterccam"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Accounting Master UATP" ,"url":"sales/accountingmasteruatp"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Accounting Master BINES" ,"url":"sales/accountingmasterbines"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Accounting Master TNU" ,"url":"sales/accountingmastertnu"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Accounting Master PAGA TODO" ,"url":"sales/accountingmasterpagatodo"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Accounting Master Decision Table" ,"url":"sales/accountingmasterdecisiontable"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Accounting Master Travel Voucher" ,"url":"sales/accountingmastertravelvoucher"},
                                            { "leaf":true, "iconCls":"play-down-icon","text": "Accounting Master Zone GSA" ,"url":"sales/accountingmasterzonegsa"}
                                        ]}
                                    ]
                                }
                            ]
                        },
                        {
                            "text": "TREE4",
                            "expanded": true,
                            "children": [
                                {
                                    "text": "CONTROL BPO",
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Application.js" }
                                    ]
                                },
                                {
                                    "text": "button",
                                    "expanded": true,
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Button.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Cycle.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Split.js" }
                                    ]
                                },
                                {
                                    "text": "container",
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "ButtonGroup.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Container.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Viewport.js" }
                                    ]
                                },
                                {
                                    "text": "core",
                                    "iconCls":"play-icon",
                                    "children": [
                                        {
                                            "text": "dom",
                                            "children": [
                                                { "leaf":true, "iconCls":"play-down-icon","text": "Element.form.js" },
                                                { "leaf":true, "iconCls":"play-down-icon","text": "Element.static-more.js" }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "text": "dd",
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DD.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DDProxy.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DDTarget.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragDrop.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragDropManager.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragSource.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragTracker.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragZone.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragTarget.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragZone.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Registry.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "ScrollManager.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "StatusProxy.js" }
                                    ]
                                },
                                {
                                    "text": "core",
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.alignment.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.anim.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.dd.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.fx.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.position.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.scroll.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.style.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.traversal.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Helper.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Query.js" }
                                    ]
                                },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Action.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Component.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Editor.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Img.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Layer.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "LoadMask.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "ProgressBar.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Shadow.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "ShadowPool.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "ZIndexManager.js" }
                            ]
                        },
                        {
                            "text": "TREE5",
                            "expanded": true,
                            "children": [
                                {
                                    "text": "COMMISSIONS",
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Application.js" }
                                    ]
                                },
                                {
                                    "text": "button",
                                    "expanded": true,
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Button.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Cycle.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Split.js" }
                                    ]
                                },
                                {
                                    "text": "container",
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "ButtonGroup.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Container.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Viewport.js" }
                                    ]
                                },
                                {
                                    "text": "core",
                                    "iconCls":"play-icon",
                                    "children": [
                                        {
                                            "text": "dom",
                                            "children": [
                                                { "leaf":true, "iconCls":"play-down-icon","text": "Element.form.js" },
                                                { "leaf":true, "iconCls":"play-down-icon","text": "Element.static-more.js" }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "text": "dd",
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DD.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DDProxy.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DDTarget.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragDrop.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragDropManager.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragSource.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragTracker.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragZone.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragTarget.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragZone.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Registry.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "ScrollManager.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "StatusProxy.js" }
                                    ]
                                },
                                {
                                    "text": "core",
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.alignment.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.anim.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.dd.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.fx.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.position.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.scroll.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.style.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.traversal.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Helper.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Query.js" }
                                    ]
                                },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Action.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Component.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Editor.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Img.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Layer.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "LoadMask.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "ProgressBar.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Shadow.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "ShadowPool.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "ZIndexManager.js" }
                            ]
                        },
                        {
                            "text": "TREE6",
                            "expanded": true,
                            "children": [
                                {
                                    "text": "ACCOUNTING",
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Application.js" }
                                    ]
                                },
                                {
                                    "text": "button",
                                    "expanded": true,
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Button.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Cycle.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Split.js" }
                                    ]
                                },
                                {
                                    "text": "container",
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "ButtonGroup.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Container.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Viewport.js" }
                                    ]
                                },
                                {
                                    "text": "core",
                                    "iconCls":"play-icon",
                                    "children": [
                                        {
                                            "text": "dom",
                                            "children": [
                                                { "leaf":true, "iconCls":"play-down-icon","text": "Element.form.js" },
                                                { "leaf":true, "iconCls":"play-down-icon","text": "Element.static-more.js" }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "text": "dd",
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DD.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DDProxy.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DDTarget.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragDrop.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragDropManager.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragSource.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragTracker.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragZone.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragTarget.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "DragZone.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Registry.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "ScrollManager.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "StatusProxy.js" }
                                    ]
                                },
                                {
                                    "text": "core",
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.alignment.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.anim.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.dd.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.fx.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.position.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.scroll.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.style.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Element.traversal.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Helper.js" },
                                        { "leaf":true, "iconCls":"play-down-icon","text": "Query.js" }
                                    ]
                                },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Action.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Component.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Editor.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Img.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Layer.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "LoadMask.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "ProgressBar.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "Shadow.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "ShadowPool.js" },
                                { "leaf":true, "iconCls":"play-down-icon","text": "ZIndexManager.js" }
                            ]
                        }
                    ]
                },
                {
                    "text": "FLOWN",
                    "id":"tab-2",
                    "expanded": true,
                    "children": [
                        {
                            "text": "TREE1",
                            "expanded": true,
                            "iconCls":"play-icon",
                            "children": [
                                {
                                    "text": "Master Table",
                                    "expanded": true,
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "text": "Master Table", "iconCls":"play-icon","children": [
                                            { "leaf":true, "text": "Zone Master File" ,"iconCls":"play-down-icon","url":"flown/zonemasterfile"},
                                            { "leaf":true, "text": "Aircraft Master" ,"iconCls":"play-down-icon","url":"flown/aircraftmaster"},
                                            { "leaf":true, "text": "MultiLeg Table" ,"iconCls":"play-down-icon","url":"flown/multiLegtable"},
                                            { "leaf":true, "text": "SSIM Complementary File" ,"iconCls":"play-down-icon","url":"flown/ssimcomplementaryfiles"},
                                            { "leaf":true, "text": "Duplicated SSIM" ,"iconCls":"play-down-icon","url":"flown/duplicatedssim"},
                                            { "leaf":true, "text": "Kms By City Pair" ,"iconCls":"play-down-icon","url":"flown/kmsbycitypair"},
                                            { "leaf":true, "text": "Average Fare" ,"iconCls":"play-down-icon","url":"flown/averagefare"},
                                            { "leaf":true, "text": "Average Fare EMD" ,"iconCls":"play-down-icon","url":"flown/averagefareemd"},
                                            { "leaf":true, "text": "Accounting Calendar" ,"iconCls":"play-down-icon","url":"flown/accountingcalendar"},
                                            { "leaf":true, "text": "Catalogue of Flight" ,"iconCls":"play-down-icon","url":"flown/catalogueofflight"}
                                        ]},
                                        { "text": "Accounting","iconCls":"play-icon" ,"children": [
                                            { "leaf":true, "text": "Accounting Master Flown" ,"iconCls":"play-down-icon","url":"flown/accMasterFlown"},
                                            { "leaf":true, "text": "Accounting Master Miscellaneous" ,"iconCls":"play-down-icon","url":""}
                                        ]},
                                        { "leaf":true, "text": "INPUTS Control","iconCls":"play-icon" ,"iconCls":"play-down-icon","url":""},
                                        { "leaf":true, "text": "Ownerless Coupon","iconCls":"play-icon" ,"iconCls":"play-down-icon","url":""}
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "text": "INTERLINE",
                    "id":"tab-3",
                    "expanded": true,
                    "children": [
                        {
                            "text": "TREE1",
                            "expanded": true,
                            "children": [
                                {
                                    "text": "Master Table",
                                    "expanded": true,
                                    "iconCls":"play-icon",
                                    "children": [
                                        { "text": "Special Agreements Table","expanded": true,"iconCls":"play-icon" ,"children": [
                                            { "leaf":true, "text": "SPA Report" ,"iconCls":"play-down-icon","url":"interline/spareport"}
                                        ]},
                                        { "text": "Accounting","expanded": true,"iconCls":"play-icon" ,"children": [
                                            { "leaf":true, "text": "Accounting Master Interline" ,"iconCls":"play-down-icon","url":"interline/accountingmasterinterline"}
                                        ]},
                                        { "leaf":true, "text": "Tax RATD","url":"interline/taxratd"},
                                        { "leaf":true, "text": "PMI","url":"interline/pmi"},
                                        { "leaf":true, "text": "Source Code","url":"interline/sourcecode"},
                                        { "leaf":true, "text": "IATA Calendar","url":"interline/iatacalendar"},
                                        { "leaf":true, "text": "IS-IDEC Control","url":"interline/isideccontrol"},
                                        { "leaf":true, "text": "Work Progress OAL","url":"interline/workprogressoal"}
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "text": "MODULES",
                    "expanded": true,
                    "id":"tab-4",
                    "children": [
                        
                    ]
                },
                {
                    "text": "TNU",
                    "expanded": true,
                    "id":"tab-5",
                    "children": [
                        
                    ]
                },
                {
                    "text": "PAYMENT CONTROL",
                    "expanded": true,
                    "id":"tab-6",
                    "children": [
                        
                    ]
                },
                {
                    "text": "BY TOOLS",
                    "expanded": true,
                    "id":"tab-7",
                    "children": [
                        
                    ]
                },
                {
                    "text": "OTHERS",
                    "expanded": true,
                    "id":"tab-8",
                    "children": [
                        
                    ]
                },
                {
                    "text": "FAVORITES",
                    "expanded": true,
                    "id":"tab-9",
                    "children": [
                        
                    ]
                },
                {
                    "text": "PANEL",
                    "expanded": true,
                    "id":"tab-10",
                    "children": [
                        
                    ]
                },
                {
                    "text": "FARE AUDIT",
                    "expanded": true,
                    "id":"tab-11",
                    "children": [
                        
                    ]
                },
                {
                    "text": "PLM",
                    "expanded": true,
                    "id":"tab-12",
                    "children": [
                        {
                            "text": "TREE6",
                            "expanded": true,
                            "children": [
                                {
                                    "text": "Master",
                                    "expanded": true,
                                    "iconCls":"play-icon",
                                    "children": [
                                        { 
                                            "text": "Special Agreements Table",
                                            "expanded": true,
                                            "iconCls":"play-icon" ,
                                            "children": [
                                                { 
                                                    "text": "SPA Report" ,
                                                    "iconCls":"play-down-icon",
                                                    "url":"interline/spareport",
                                                    "children": [
                                                        { 
                                                            "text": "SPA Report 1" ,
                                                            "iconCls":"play-down-icon",
                                                            "url":"interline/spareport",
                                                            "children": [
                                                                { 
                                                                    "text": "SPA Report 2" ,
                                                                    "iconCls":"play-down-icon",
                                                                    "url":"interline/spareport",
                                                                    "children": [
                                                                        { 
                                                                            "text": "SPA Report 3" ,
                                                                            "iconCls":"play-down-icon",
                                                                            "url":"interline/spareport",
                                                                            "children": [
                                                                                { 
                                                                                    "text": "SPA Report 4" ,
                                                                                    "iconCls":"play-down-icon",
                                                                                    "url":"interline/spareport",
                                                                                    "children": [
                                                                                        { 
                                                                                            "leaf":true, 
                                                                                            "text": "SPA Report 5" ,
                                                                                            "iconCls":"play-down-icon",
                                                                                            "url":"interline/spareport"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
});

