import ClassNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import { Notification } from '../index';
import { NotificationDrawer } from '../NotificationDrawer/index';
import { Icon } from '../../Icon';
import { Button } from '../../Button';
import { MenuItem } from '../../MenuItem';
import { EmptyState, EmptyStateTitle, EmptyStateIcon } from '../../../index';
import getIconClass from './Icon.consts';

const PanelWrapper = ({
  panelkey,
  panelName,
  className,
  notifications,
  isExpanded,
  togglePanel,
  onNotificationClick,
  onNotificationHide,
  onMarkPanelAsRead,
  onClickedLink,
  onMarkPanelAsClear,
  showLoading
}) => {
  const classes = ClassNames({ expanded: isExpanded }, className);
  const unreadCount = notifications.filter(notification => !notification.seen)
    .length;

  const getUnread = () => {
    if (unreadCount !== 1) return `${unreadCount} New Events`;
    return '1 New Event';
  };

  const renderNotifications = notifications.map((notification, i) => (
    <Notification
      key={i}
      seen={notification.seen}
      onClick={() => onNotificationClick(panelkey, notification.id)}
    >
      <NotificationDrawer.Dropdown pullRight id={i}>
        {notification.actions.links.map((link, j) => (
          <MenuItem
            key={j}
            id={`notification-kebab-${j}`}
            onClick={() => onClickedLink(link.href)}
          >
            {link.title}
          </MenuItem>
        ))}
        <MenuItem divider />
        <MenuItem
          id="notification-kebab-hide"
          onClick={() => onNotificationHide(panelkey, notification.id)}
        >
          Hide this notification
        </MenuItem>
      </NotificationDrawer.Dropdown>
      <Icon
        className="pull-left"
        type="pf"
        name={getIconClass(notification.level)}
      />
      <Notification.Content>
        <Notification.Message>{notification.text}</Notification.Message>
        <Notification.Info
          leftText={new Date(notification.created_at).toLocaleDateString()}
          rightText={new Date(notification.created_at).toLocaleTimeString()}
        />
      </Notification.Content>
    </Notification>
  ));
  const renderClearReadButtons = (
    <NotificationDrawer.PanelAction key={panelkey}>
      <NotificationDrawer.PanelActionLink
        className="drawer-pf-action-link"
        data-toggle="mark-all-read"
        onClick={() => onMarkPanelAsRead(panelkey)}
      >
        <Button bsStyle="link">Mark All Read</Button>
      </NotificationDrawer.PanelActionLink>
      <NotificationDrawer.PanelActionLink
        data-toggle="clear-all"
        onClick={() => onMarkPanelAsClear(panelkey)}
      >
        <Button bsStyle="link">
          <Icon type="pf" name="close" />
          Clear All
        </Button>
      </NotificationDrawer.PanelActionLink>
    </NotificationDrawer.PanelAction>
  );
  const renderClearButton = (
    <NotificationDrawer.PanelAction key={panelkey}>
      <NotificationDrawer.PanelActionLink
        data-toggle="clear-all"
        onClick={() => onMarkPanelAsClear(panelkey)}
      >
        <Button bsStyle="link">
          <Icon type="pf" name="close" />
          Clear All
        </Button>
      </NotificationDrawer.PanelActionLink>
    </NotificationDrawer.PanelAction>
  );
  const noNotificationsMessage = (
    <EmptyState>
      <EmptyStateIcon name="info" />
      <EmptyStateTitle>No Notifications Available</EmptyStateTitle>
    </EmptyState>
  );

  return (
    <NotificationDrawer.Panel className={classes}>
      <NotificationDrawer.PanelHeading onClick={() => togglePanel(panelkey)}>
        <NotificationDrawer.PanelTitle>
          <a className={isExpanded ? '' : 'collapsed'}>{panelName}</a>
        </NotificationDrawer.PanelTitle>
        <NotificationDrawer.PanelCounter text={getUnread()} />
      </NotificationDrawer.PanelHeading>
      <Collapse in={isExpanded}>
        <NotificationDrawer.PanelCollapse id={panelkey}>
          <NotificationDrawer.PanelBody>
            {notifications.length > 0
              ? [
                  showLoading
                    ? [
                        renderNotifications,
                        <Notification key="loading" type="loading" />
                      ]
                    : renderNotifications,
                  unreadCount > 0 ? renderClearReadButtons : renderClearButton
                ]
              : noNotificationsMessage}
          </NotificationDrawer.PanelBody>
        </NotificationDrawer.PanelCollapse>
      </Collapse>
    </NotificationDrawer.Panel>
  );
};

PanelWrapper.propTypes = {
  /** Panel Key,Name */
  panelkey: PropTypes.string,
  panelName: PropTypes.string,
  className: PropTypes.string,
  /** Notification Panels Array */
  notifications: PropTypes.array,
  /** is Expanded Bool */
  isExpanded: PropTypes.bool,
  /** function(panelkey, notificationkey) on Notification Click */
  onNotificationClick: PropTypes.func,
  /** on function(panelkey) Panel Read All Click */
  onMarkPanelAsRead: PropTypes.func,
  /** function(url) on Dropdown Link Click */
  onClickedLink: PropTypes.func,
  /** function(panelkey, notificationkey) on Notification Hide Click */
  onNotificationHide: PropTypes.func,
  /** function(panelkey) Panel Clear All Click */
  onMarkPanelAsClear: PropTypes.func,
  /** function() togglePanel Click */
  togglePanel: PropTypes.func,
  /** show Loading notification Bool */
  showLoading: PropTypes.bool
};
PanelWrapper.defaultProps = {
  panelkey: '1',
  notifications: PropTypes.array,
  isExpanded: false,
  className: null,
  panelName: null,
  onNotificationClick: null,
  onMarkPanelAsRead: null,
  onClickedLink: null,
  onNotificationHide: null,
  onMarkPanelAsClear: null,
  togglePanel: null,
  showLoading: false
};

export default PanelWrapper;
