import { useState, useEffect, useRef } from "react"
import { AxiosResponse } from 'axios';
import { FetchClusterAlerts } from '../Request';
import { ICluster } from "../App"
import { ClusterDetailComponent } from '../ClusterDetailList'
import { ClusterAlertsComponent } from './ClusterAlerts';
import { IMessageBarStyles, MessageBar, MessageBarType, Stack } from '@fluentui/react';

const errorBarStyles: Partial<IMessageBarStyles> = { root: { marginBottom: 15 } }

export function ClusterAlertsWrapper(props: {
  clusterName: string
  currentCluster: ICluster
  detailPanelSelected: string
  loaded: boolean
}) {
  const [data, setData] = useState<any>([])
  const [error, setError] = useState<AxiosResponse | null>(null)
  const state = useRef<ClusterDetailComponent>(null)
  const [fetching, setFetching] = useState("")

  const errorBar = (): any => {
    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={false}
        onDismiss={() => setError(null)}
        dismissButtonAriaLabel="Close"
        styles={errorBarStyles}
      >
        {error?.statusText}
      </MessageBar>
    )
  }

  // updateData - updates the state of the component
  // can be used if we want a refresh button.
  // api/clusterdetail returns a single item.
  const updateData = (newData: any) => {
    setData(newData)
    if (state && state.current) {
      state.current.setState({ item: newData, detailPanelSelected: props.detailPanelSelected })
    }
  }

  useEffect(() => {
    const onData = (result: AxiosResponse | null) => {
      if (result?.status === 200) {
        updateData(result.data)
      } else {
        setError(result)
      }
      setFetching(props.currentCluster.name)
    }

    if (props.detailPanelSelected.toLowerCase() == "clusteralerts" &&
        fetching === "" &&
        props.loaded &&
        props.currentCluster.name != "") {
      setFetching("FETCHING")
      FetchClusterAlerts(props.currentCluster).then(onData)
    }
  }, [data, props.loaded, props.clusterName])

  return (
    <Stack>
      <Stack.Item grow>{error && errorBar()}</Stack.Item>
      <Stack>
        <ClusterAlertsComponent item={data} clusterName={props.currentCluster != null ? props.currentCluster.name : ""}/>
      </Stack>
    </Stack>
  )
}