Ext.define('Ext.Praxis.view.panel.PerProForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    height: 40,
    layout:'column',
    items: [
        {
            xtype:'panel',
            border:false,
            bodyStyle: 'background: transparent',
            padding: '5px 8px',
            layout: 'column',
            items: [
                {
                    width: 220,
                    border:false,
                    bodyStyle: 'background: transparent',
                    items:[
                        {
                            xtype:'combo',
                            fieldLabel: '<span style="color:#000;">Search By</span>',
                            id: prototype.id + '-cboGroup',
                            labelAlign:'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            //emptyText: pxutils.emptyText,
                            labelWidth: 70,
                            width:'100%',
                            anchor:'100%',
                            listeners: {
                                afterrender: function(obj) {
                                    obj.setValue('1'); //All
                                }
                            }
                        }
                    ]
                },
                {
                    width: 220,
                    border:false,
                    bodyStyle: 'background: transparent',
                    items:[
                        {
                            xtype: 'textfield',
                            id: prototype.id+'-codigo-option',
                            maxLength: 10,
                            enforceMaxLength: true,
                            labelWidth:90,
                            labelAlign:'right',
                            width:'100%',
                            anchor:'100%',
                            listeners:{
                                change: 'onUpperValue'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});