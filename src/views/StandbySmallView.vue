<script setup lang="ts">
import { useMonitorData } from '@/composables/useMonitorData'
import MonitorShell from '@/components/MonitorShell.vue'
import AlarmSwitcher from '@/components/AlarmSwitcher.vue'
import StandbyView from '@/views/monitor-modes/StandbyView.vue'
import AlarmView from '@/views/monitor-modes/AlarmView.vue'

const { monitor, loading, connectionOk, connectedSince, disconnectedSince, units } = useMonitorData()
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
        <StandbyView :department-name="monitor.departmentName" :units="units" :connection-ok="connectionOk" />
      </template>
      <template #alarm="{ alarm }">
        <AlarmView :alarm="alarm" :units="units" />
      </template>
    </AlarmSwitcher>
  </MonitorShell>
</template>
