Ext.define('Ext.Praxis.view.payments.ProcessLoggerForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'hbox',
    items: [
        {
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: transparent',
            height: 'auto',
            margin: '0 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Browser">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFilters',
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 10',
                    layout: 'vbox',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '5 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    name: 'IN_FUUID',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date()
                                },
                                {
                                  xtype:'textfield',
                                  name: 'IN_CUUID',
                                  width: 280,
                                  labelWidth: 100,
                                  fieldLabel: 'ID',
                                  maxLenght: 32,
                                  enforceMaxLenght: true
                                },
                                {
                                  xtype:'textfield',
                                  name: 'IN_PROCESO',
                                  width: 280,
                                  labelWidth: 100,
                                  fieldLabel: 'Process Name',
                                  maxLenght: 60,
                                  enforceMaxLenght: true
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    name: 'IN_STPRO',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['P', 'Processing'],
                                            ['C', 'Completed'],
                                            ['X', 'Error']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 210,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                }
                            ]
                        }

                    ]
                }
                //</editor-fold>
            ]
        }
    ]
});
