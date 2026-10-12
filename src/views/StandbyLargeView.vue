<script setup lang="ts">
import { useMonitorData } from '@/composables/useMonitorData'
import MonitorShell from '@/components/MonitorShell.vue'
import AlarmSwitcher from '@/components/AlarmSwitcher.vue'
import AlarmMapView from '@/views/monitor-modes/AlarmMapView.vue'
import InfoView from './monitor-modes/InfoView.vue'

const { monitor, loading, connectionOk, connectedSince, disconnectedSince, units, tenant } = useMonitorData()
</script>

<template>
  <MonitorShell
    :monitor="monitor"
    :loading="loading"
    :connection-ok="connectionOk"
    :connected-since="connectedSince"
    :disconnected-since="disconnectedSince"
  >
    <AlarmSwitcher v-if="monitor" :alarm="monitor.alarm">
      <template #standby>
        <InfoView :department-name="monitor.departmentName" :connection-ok="connectionOk" :units="units" :tenant="tenant"/>
      </template>
      <template #alarm="{ alarm }">
        <AlarmMapView :alarm="alarm" :units="units" />
      </template>
    </AlarmSwitcher>
  </MonitorShell>
</template>
