Ext.define('Ext.Praxis.view.payments.AgentsCatalogForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '12px 0 12px 12px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                labelAlign: 'left'
            },
            items: [
                {
                    fieldLabel: 'Code',
                    xtype: 'textfield',
                    id: prototype.id + '-txtCAGENCY',
                    width: 140,
                    labelWidth: 35,
                   maxLength: 8,
                    maskRe: /[0-9a-zA-Z]/,
                    enforceMaxLength: true, 
                    style: 'margin-right:10px;',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'BuscarCAGENCY'
                    }
                },
                
                {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    id: prototype.id + '-cmbCountry',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    emptyText: 'All',
                    width: 200,
                    labelWidth: 55,
                    hiddenLabel: false,
                    style: 'margin-right:10px;',
                    listeners: {
                        change: function (cmb, newCountry) {

                            var cmbCity = Ext.getCmp(prototype.id + '-cmbCity');
                            var store = cmbCity.getStore();

                            cmbCity.reset();
                            cmbCity.setDisabled(true);

                            if (!newCountry) return;

                            store.load({
                                params: {
                                    beanString: Ext.encode({ COUNTRY: newCountry })
                                },
                                callback: function (recs) {
                                    cmbCity.setDisabled(recs.length === 0);
                                }
                            });
                        }
                    }

                },
                
                //COMBO CIUDADES 
                //////
 
      

            {
                xtype: 'combo',
                fieldLabel: 'City',
                id: prototype.id + '-cmbCity',
                labelWidth: 30,
                width: 160,
                disabled: true,
                queryMode: 'local',
                triggerAction: 'all',
                valueField: 'CITY',
                displayField: 'CITY',
                emptyText: 'All',
                    style: 'margin-right:10px;',
    store: { /* igual */ },
                store: {
                    fields: ['CITY'],
                    proxy: {
                        type: 'ajax',
                        url: 'AgentsCatalog/getCitiesByCountry',
                        reader: {
                            type: 'json',
                            rootProperty: 'data'
                        }
                    },
                    autoLoad: false
                }
            },
            




/////////
                 {
                    xtype: 'combo',
                    fieldLabel: 'Currency ',
                    id: prototype.id + '-cmbCode',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'A005KEY',
                    displayField: 'A005KEY2',
                    emptyText: 'All',
                    maxLength: 3,
                    labelWidth: 120,
                    width: 180,
                    hidden: true,
                    hiddenLabel: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Bank',
                    id: prototype.id + '-cmbBank',
                    fieldStyle: 'text-align: left;',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'CODEBANK',
                    displayField: 'IN_CODE_IN_NAME',
                    emptyText: 'All',
                    width: 240,
                    labelWidth: 80,
                    hidden: true,
                    hiddenLabel: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Bussines',
                    id: prototype.id + '-cmbNEGOC',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 200,
                    labelWidth: 60,
                    hiddenLabel: false,
                    style: 'margin-right:10px;',
                },
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-cargaAgents',
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 20',
                    layout: 'column',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        xtype: 'textfield',
                        hidden: false,
                        selectOnFocus: true
                    },
                    items: [

                        {
                            xtype: 'form',
                            id: prototype.id + '-formAgents',
                            border: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [{

                                    xtype: 'filefield',
                                    id: prototype.id + '-file',
                                    name: 'excelfile',
                                    allowBlank: true,
                                    accept: '.xlsx, .xls',
                                    labelWidth: 85,
                                    width: 350,
                                    buttonAlign: 'left',
                                    buttonText: 'Select excel...',
                                    regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                                    regexText: 'Only XLS and XLSX formats are accepted',
                                    buttonConfig: {
                                        text: '<strong>Select</strong>',
                                        width: 80,
                                        style: 'margin-right: 10px;'
                                    },
                                    listeners: {
                                        //change: 'onUploadChange'
                                    }
                                }]
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn_CargaAgents',
                            margin: '1 0 0 0',
                            html: '<strong style="color:white;">LOAD</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            border: false,
                            listeners: {
                                click: 'onLoadClick'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});



